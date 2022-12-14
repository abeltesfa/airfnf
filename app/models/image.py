from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true
from .user import User

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    carId = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    image_id = db.relationship("Car", back_populates="car_images")

    def to_dict(self):
        return {
            'id': self.id,
            'carId': self.carId,
            'url': self.url
        }
