from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true
from .user import User

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    carId = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    startDate = db.Column(db.DateTime, nullable=False)
    endDate = db.Column(db.DateTime, nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    booking_id = db.relationship("User", back_populates="owner_bookings")
    car_id = db.relationship("Car", back_populates="car_booking")
