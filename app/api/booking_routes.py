from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user
from ..models import db, Booking

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/<int:userId>')
def get_bookings_user(userId):
    user_bookings = Booking.query.filter(Booking.userId == userId).all()
    bookings = [booking.to_dict() for booking in user_bookings]
    return {'user_bookings': bookings}
