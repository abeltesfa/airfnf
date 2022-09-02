from app.models import db, Review

def seed_reviews():
    review1 = Review(userId=5, carId=1, rating=5, body='Very reliable car, I recommend the upgrade :D ')

    db.session(review1)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
