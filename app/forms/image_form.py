from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    carId = IntegerField('carId', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
