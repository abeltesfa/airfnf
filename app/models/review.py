from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    carId = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
