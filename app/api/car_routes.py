from flask import Blueprint
from flask_wtf.csrf import validate_csrf
from ..models import db, Car

car_routes = Blueprint('cars', __name__)

@car_routes.route('/')
def get_cars():
    cars = Car.query.all()
    posts = [car.to_dict() for car in cars]
    return {'cars': posts}
