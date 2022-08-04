from crypt import methods
from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.car_form import CarForm
from flask_login import current_user
from ..models import db, Car

car_routes = Blueprint('cars', __name__)

@car_routes.route('/')
def get_cars():
    cars = Car.query.all()
    posts = [car.to_dict() for car in cars]
    return {'cars': posts}

@car_routes.route('/new', methods=['POST'])
def create_cars():
    form = CarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        car = Car(
            userId= current_user.id,
            make = form.data['make'],
            model = form.data['model'],
            carYear = form.data['carYear'],
            city = form.data['city'],
            state = form.data['state'],
            country = form.data['country'],
            description = form.data['description'],
            price = form.data['price'],
        )
        db.session.add(car)
        db.session.commit()
        return car.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401
