from app.models import db, Car

def seed_cars():
    car1 = Car(userId=2, make='Toyota', model='Camry', carYear=2013, city='Charlotte', state='NC', country='USA', description='Despite its lack of engaging handling and user-friendly features, the 2013 Toyota Camry sits near the pinnacle of its class thanks to its top-notch reliability rating, roomy interior, and efficient yet powerful engines.', price=100.00)
    car2 = Car(userId=2, make='Ford', model='F-150', carYear=2021, city='Charlotte', state='NC', country='USA', description='The redesigned 2021 Ford F-150 claims one of the top spots in the full-size pickup truck rankings because of its tremendous capability and spacious, comfortable cabin.', price=150.00)
    car3=Car(userId=3, make='Honda', model='S2000', carYear=2008, city='Fairfax', state='VA', country='USA', description='The 2008 Honda S2000 ranks high performance and one of the best sports cars in its class', price=210.00)
    car4= Car(userId=3, make='Jeep', model='Grand Cherokee', carYear=2019, city='Denver', state='CO', country='USA', description='The Jeep Grand Cherokee offers a comfortable ride both on- and off-road, plenty of passenger space, and an intuitive infotainment system.', price=175.50)
    car5=Car(userId=4, make='Porsche', model='911 Carrera', carYear=2022, city='New York', state='NY', country='USA', description='The 2022 Porsche 911 Carrera ranks highly among luxury sports cars thanks in part to its enticing acceleration, standard-setting handling, and impeccable quality.', price=333.33)
    car6= Car(userId=4, make='Land Rover', model='Range Rover', carYear= 2022, city='Newark', state='NJ', country='USA', description='The 2022 Land Rover Range Rover has an opulent interior, several powerful engine options, and phenomenal off-road abilities.', price=150.50)
    car7=Car(userId=5, make='Toyota', model='Camry', carYear=2014, city='Fairfax', state='VA', country='USA', description='An excellent reliability rating helps propel the 2014 Toyota Camry high in the midsize car class.', price=100.00)
    car8=Car(userId=5, make='Audi', model='R8', carYear=2018, city='Silver Springs', state='MD', country='USA', description='The 2018 Audi R8 offers sharp driving dynamics, powerful engine performance, and a quality interior.', price=280.50)
    car9=Car(userId=6, make='Mercedes-Benz', model='G-Class', carYear=2021, city='Pasadena', state='CA', country='USA', description='The Mercedes-Benz G-Class ranks near the top of the luxury large SUV class for its fusion of opulence and technology with comfort and power. It???s a great off-road vehicle too.', price=300.99)
    car10=Car(userId=6,make='Lamborghini', model='Aventador',carYear=2019, city='Los Angeles', state='CA', country='USA',description='The 2019 Lamborghini Aventador brings the hammer down on subtlety, offering over-the-top styling to match its over-the-top performance credentials.', price=420.69)

    db.session.add(car1)
    db.session.add(car2)
    db.session.add(car3)
    db.session.add(car4)
    db.session.add(car5)
    db.session.add(car6)
    db.session.add(car7)
    db.session.add(car8)
    db.session.add(car9)
    db.session.add(car10)

    db.session.commit()

def undo_cars():
    db.session.execute('TRUNCATE cars RESTART IDENTITY CASCADE;')
    db.session.commit()
