from crypt import methods
from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.car_form import CarForm
from flask_login import current_user
from app.forms.image_form import ImageForm
from ..models import db, Car, Image

car_routes = Blueprint('cars', __name__)

@car_routes.route('/')
def get_cars():
    cars = Car.query.all()
    posts = [car.to_dict() for car in cars]
    return {'cars': posts}

@car_routes.route('/images')
def get_images():
    images = Image.query.all()
    images = [image.to_dict() for image in images]
    return{'images': images}

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
        image1 = Image(
            carId=car.id,
            url = form.data['image1']
        )
        image2 = Image(
            carId=car.id,
            url = form.data['image2']
        )
        image3 = Image(
            carId=car.id,
            url = form.data['image3']
        )
        image4 = Image(
            carId=car.id,
            url = form.data['image4']
        )
        image5 = Image(
            carId=car.id,
            url = form.data['image5']
        )
        db.session.add(image1)
        db.session.commit()
        db.session.add(image2)
        db.session.commit()
        db.session.add(image3)
        db.session.commit()
        db.session.add(image4)
        db.session.commit()
        db.session.add(image5)
        db.session.commit()
        return car.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@car_routes.route('/<int:carId>/edit', methods=['PUT'])
def edit_cars(carId):
    form = CarForm()
    edited_car = Car.query.get(carId)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_car.make = form.data['make'],
        edited_car.model = form.data['model'],
        edited_car.carYear = form.data['carYear'],
        edited_car.city = form.data['city'],
        edited_car.state = form.data['state'],
        edited_car.country = form.data['country'],
        edited_car.description = form.data['description'],
        edited_car.price = form.data['price'],
        edited_car.car_images[0].url = form.data['image1'],
        edited_car.car_images[1].url = form.data['image2'],
        edited_car.car_images[2].url = form.data['image3'],
        edited_car.car_images[3].url = form.data['image4'],
        edited_car.car_images[4].url = form.data['image5'],

        db.session.commit()
        return edited_car.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@car_routes.route('/<int:carId>/delete', methods=['DELETE'])
def delete_car(carId):
    deleted_car = Car.query.get(carId)
    db.session.delete(deleted_car)
    db.session.commit()
    return f'{carId}'
