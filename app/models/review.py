from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    carId = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    review_owner = db.relationship("User", back_populates="owner_reviews")
    review_car = db.relationship("Car", back_populates="car_reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'carId': self.carId,
            'rating': self.rating,
            'body': self.body
        }
