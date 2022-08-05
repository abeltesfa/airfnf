from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField
from wtforms.validators import DataRequired

class CarForm(FlaskForm):
    userId = IntegerField('userId')
    make = StringField('make', validators=[DataRequired()])
    model = StringField('model', validators=[DataRequired()])
    carYear = IntegerField('carYear', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    image1= StringField('image1', validators=[DataRequired()] )
    image2= StringField('image2', validators=[DataRequired()] )
    image3= StringField('image3', validators=[DataRequired()] )
    image4= StringField('image4', validators=[DataRequired()] )
    image5= StringField('image5', validators=[DataRequired()] )
