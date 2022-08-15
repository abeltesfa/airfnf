# airfnf

## Introduction
Welcome to airfnf short for airFastNFurious, a clone of the popular airbnb website. airfnf allows you to create a user who can either add cars to be booked or book cars that exist on the website. The current bookings are listed on every car page for the users information. Enjoy the wide selection of cars and even create a user to add more. 

## Technologies Used
- Languages: Javascript, HTML, CSS
- Front-End: React-Redux, JSX
- Back-End: Python, Flask-SQLAlchemy
- Database: PostgreSQL
- Hosting: Heroku

## Link to live site
https://air-fnf.herokuapp.com/

## Link to the wikidocs
https://github.com/abeltesfa/airfnf/wiki

## Features

### Register/Sign-in
Users can register an account or sign in with airfnf on the home page. The home page serves as both the splash page and a place where the user can sign in or register. Users must sign in with the email and password used when signing up. Users do not need to be signed in to view the home page.

![image](https://user-images.githubusercontent.com/99838762/184603321-717e96fd-e2f8-49fd-88bc-eca94482deef.png)

### View Specific Cars
Users whether logged in or not can click on specific cars and view the details surrounding the cars. This includes the current bookings listed with the car.

![image](https://user-images.githubusercontent.com/99838762/184604206-f6f45f56-df10-4cea-b970-d931ad9af376.png)

![image](https://user-images.githubusercontent.com/99838762/184604282-fa0a03f9-17fe-4ecb-af33-909d9c5b5d35.png)


### Create, Edit, or Delete a Car post
Users can create a new car post to add to airfnf. It requires the car year, make, model, city, state, country, description, price, and 5 image urls. The user who created the car can also edit the car post as well. 

![image](https://user-images.githubusercontent.com/99838762/184605132-a98b179a-e2fe-4ba2-bb2e-5ff22c0f6cee.png)

![image](https://user-images.githubusercontent.com/99838762/184605662-1226e743-17ad-4602-8523-54172c34d4b6.png)

![image](https://user-images.githubusercontent.com/99838762/184605801-6a38b6a6-7136-4266-8cfb-ed7ce8bd6bf4.png)


### Create Bookings on Cars
Logged in users have the ability to create bookings on specific cars by going to the specific car page and selecting a start and end date. 

![image](https://user-images.githubusercontent.com/99838762/184606298-1b894510-5181-4b23-8c56-c0345e85ded9.png)


### Edit or Delete Bookings on Cars
Users who created a booking have the ability to edit the bookings they have created as well. 

![image](https://user-images.githubusercontent.com/99838762/184606700-34a4c0fb-30b6-4c00-afd3-efcb77dbe334.png)

![image](https://user-images.githubusercontent.com/99838762/184606817-fd32f94f-8637-4dde-9397-b2b40af33f30.png)


### User Profile Page
Logged in users have the ability to view the bookings associated with their account as well as the price of all the bookings added up.

![image](https://user-images.githubusercontent.com/99838762/184607078-ec42f9c4-3470-48c0-bd8e-32c176e17807.png)

### Future features to implement
- Reviews
- AWS
- Calendar

## Challenges Faced
Dealing with dates and conversions proved to be a difficult task. There were timezone issues as well as general date conversion issues that had I had to be aware of when dealing with error validation for the bookings. It required the use of a package called date-fns that made the job a lot easier however there was still logic that had to be implemented when comparing dates across the database.

### Installation Instructions
1. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

2. Create a **.env** file based on the example with proper settings for your
   development environment
3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

4. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

