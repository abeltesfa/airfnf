from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    userId = IntegerField('userId')
    carId = IntegerField('carId')
    startDate = DateField('startDate', validators=[DataRequired()])
    endDate = DateField('endDate', validators=[DataRequired()])
