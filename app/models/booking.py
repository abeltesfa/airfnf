from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true
from .user import User

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    carId = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    startDate = db.Column(db.Date(), nullable=False)
    endDate = db.Column(db.Date(), nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    booking_id = db.relationship("User", back_populates="owner_bookings")
    car_id = db.relationship("Car", back_populates="car_booking")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'carId': self.carId,
            'startDate': self.startDate,
            'endDate': self.endDate,
            # 'users': [user.to_dict() for user in self.booking_id],
            # 'cars': [car.to_dict() for car in self.car_id]

        }
