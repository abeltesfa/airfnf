from flask import Blueprint, request
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user
from app.forms.review_form import ReviewForm
from ..models import db, Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:carId>')
def get_reviews_car(carId):
    car_reviews = Review.query.filter(Review.carId == carId).all()
    reviews = [review.to_dict() for review in car_reviews]
    return {'reviews': reviews}

@review_routes.route('/new', methods=['POST'])
def add_reviews():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            userId = current_user.id,
            carId = form.data['carId'],
            rating = form.data['rating'],
            body = form.data['body']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401
