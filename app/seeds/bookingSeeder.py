from app.models import db, Booking

def seed_bookings():
    booking1= Booking(userId=2, carId=7, startDate='2022-8-11', endDate='2022-8-15')
    booking2= Booking(userId=3, carId=9, startDate='2022-8-11', endDate='2022-8-15')
    booking3= Booking(userId=4, carId=2, startDate='2022-8-11', endDate='2022-8-15')

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
