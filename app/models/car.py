from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true
from .user import User

class Car(db.Model):
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    carYear = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    owner = db.relationship("User", back_populates="owner_cars")
    car_booking = db.relationship("Booking", back_populates="car_id")
    car_images = db.relationship("Image", back_populates="image_id")
