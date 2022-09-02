from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    userId = IntegerField('userId')
    carId = IntegerField('carId')
    rating= IntegerField('rating', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])
