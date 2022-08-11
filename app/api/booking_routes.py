from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user

from app.forms.booking_form import BookingForm
from ..models import db, Booking

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/<int:userId>')
def get_bookings_user(userId):
    user_bookings = Booking.query.filter(Booking.userId == userId).all()
    bookings = [booking.to_dict() for booking in user_bookings]
    return {'user_bookings': bookings}

@booking_routes.route('/cars/<int:carId>')
def get_bookings_car(carId):
    user_bookings = Booking.query.filter(Booking.carId == carId).all()
    bookings = [booking.to_dict() for booking in user_bookings]
    return {'user_bookings': bookings}

@booking_routes.route('/new', methods=['POST'])
def add_bookings():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        booking = Booking(
            userId = current_user.id,
            carId = form.data['carId'],
            startDate = form.data['startDate'],
            endDate = form.data['endDate']
        )
        db.session.add(booking)
        db.session.commit()
        return booking.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@booking_routes.route('/<int:bookingId>/edit', methods=['PUT'])
def edit_bookings(bookingId):
    form = BookingForm()
    edited_booking = Booking.query.get(bookingId)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_booking.startDate = form.data['startDate'],
        edited_booking.endDate = form.data['endDate']

        db.session.commit()
        return edited_booking.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@booking_routes.route('/<int:bookingId>/delete', methods=['DELETE'])
def delete_booking(bookingId):
    deleted_booking = Booking.query.get(bookingId)
    db.session.delete(deleted_booking)
    db.session.commit()
    return f'{bookingId}'
