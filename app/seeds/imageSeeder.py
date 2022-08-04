from app.models import db, Image

def seed_images():
    image1= Image(carId=1, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image2= Image(carId=2, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image3= Image(carId=3, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image4= Image(carId=4, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image5= Image(carId=5, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image6= Image(carId=6, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image7= Image(carId=7, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image8= Image(carId=8, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image9= Image(carId=9, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')
    image10= Image(carId=10, url='https://www.vhv.rs/dpng/d/52-520651_default-car-image-png-transparent-png.png')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
