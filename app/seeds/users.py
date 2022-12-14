from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name='Demo User', email='demo@email.com', password='password')
    user1 = User(
        username='abeltesfa', name='Abel Tesfa', email='abel@email.com', password='password')
    user2 = User(
        username='stephisgreatest', name='Eddie Lau', email='eddie@email.com', password='password')
    user3 = User(
        username='lynnsanity', name='Lynn Luong', email='lynn@email.com', password='password')
    user4 = User(
        username='jonatunkumpo', name='Jonathan Kim', email='jonathan@email.com', password='password')
    user5 = User(
        username='davidmagic', name='David Chung', email='david@email.com', password='password')


    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
