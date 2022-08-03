from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, true
from .user import User

class Booking(db.Model):
    __tablename__ = 'bookings'
