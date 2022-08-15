import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCars } from "../../store/cars";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import './HomePage.css'
// import { getAllImages } from "../../store/images";

const HomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [showLogIn, setShowLogIn] = useState(true)
    const cars = useSelector(state => state.cars);


    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch])




    return (
        cars ?
            <div className="page-outer">
                <div className="page-margin-add"></div>
                <div className="page-info-home">
                    {!sessionUser && (
                        <div className="home-splash-container">
                            <div className="home-splash-left">
                                <h2>Welcome to airfnf</h2>
                                <p>Here at airFastnFurious you can book cars or add cars to be booked.
                                    In order to book cars or add cars please sign up or log in.
                                </p>
                            </div>
                            <div className="home-splash-right">
                                {showLogIn ?
                                    <div>
                                        <LoginForm />
                                        <p>Dont have an account? <button className="home-login-switch" onClick={() => setShowLogIn(false)}>Sign up</button></p>
                                    </div>
                                    :
                                    <div>
                                        <SignUpForm />
                                        <p>Have an account? <button className="home-login-switch" onClick={() => setShowLogIn(true)}>Log In</button></p>
                                    </div>}
                            </div>
                        </div>
                    )}
                    <div className="home-cars-container">
                        {Object.values(cars).map((car) => (
                            <div className="home-single-car" key={car?.id}>
                                <NavLink to={`/cars/${car.id}`}>
                                    <img className="home-car-img" src={car.images[0]?.url} onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt=""></img>
                                    <p>{car.carYear} {car.make} {car.model}</p>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : null
    )
}

export default HomePage;
