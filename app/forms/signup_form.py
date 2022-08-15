from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_checker(form, field):
    # Checking if entered passwords match
    password = form.data['password']
    repeatPassword = form.data['repeatPassword']
    if (password != repeatPassword):
        raise ValidationError('Passwords need to match.')

def username_length(form, field):
    # Checking username length
    username = field.data
    if(len(username) > 40):
        raise ValidationError('Username must be 40 characters or less')

def email_length(form, field):
    # Checking username length
    email = field.data
    if(len(email) > 255):
        raise ValidationError('Email must be 255 characters or less')

def password_length(form, field):
    # Checking username length
    password = field.data
    if(len(password) > 255):
        raise ValidationError('Password must be 255 characters or less')

def name_length(form, field):
    # Checking username length
    name = field.data
    if(len(name) > 100):
        raise ValidationError('Name must be 100 characters or less')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('Username field is required'),Length(min=1, max=40, message='Username must be between 1 and 40 characters long'),username_exists])
    name = StringField('name', validators=[DataRequired('Name field is required'),Length(min=1, max=100, message='Name must be between 1 and 100 characters long')])
    email = StringField('email', validators=[DataRequired('Email is required'),Email(),user_exists,Length(min=1, max=255, message='Email must be between 1 and 255 characters long')])
    password = StringField('password', validators=[DataRequired('Password is required'),Length(min=1, max=255, message='Password must be between 1 and 255 characters long')])
    repeatPassword = StringField('repeatPassword', validators=[DataRequired(), password_checker])
