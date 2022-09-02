from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user
from app.forms.review_form import ReviewForm
from ..models import db, Review

review_routes = Blueprint('reviews', __name__)
