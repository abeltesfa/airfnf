import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserBookings } from "../../store/bookings";
import { getAllCars } from "../../store/cars";
import { formatInTimeZone } from 'date-fns-tz';
import { differenceInCalendarDays } from "date-fns";
import './UserPage.css'


const UserPage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);
    const cars = useSelector(state => state.cars)
    const priceArr = [];
    Object.values(bookings).map(booking => priceArr.push([booking.carId, (differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate)) + 1)]))

    useEffect(() => {
        dispatch(getUserBookings(sessionUser.id))
        dispatch(getAllCars())
    }, [dispatch, sessionUser])

    console.log(cars)
    return (
        bookings ?
            <div className="page-outer">
                <div className="page-margin-add"></div>
                <div className="page-info">
                    <div>
                        <h1>{sessionUser?.name}'s Profile Page</h1>
                        <div>
                            <h3>My Bookings</h3>
                            <div>
                                {Object.keys(bookings).length ?
                                    null
                                    : <h4>No Current Bookings listed...</h4>
                                }
                                {Object.values(bookings).map((booking) => (
                                    <div className="userprofile-booking-container" key={booking?.id}>
                                        <NavLink to={`/cars/${booking.carId}`}>
                                            <p>{cars[booking.carId]?.carYear} {cars[booking.carId]?.make} {cars[booking.carId]?.model}</p>
                                            <img className="userprofile-img" src={cars[booking.carId]?.images[0]?.url} alt=""></img>
                                        </NavLink>
                                        <p>Start Date: {formatInTimeZone(new Date(booking?.startDate), 'UTC', 'EEEE MMMM do yyyy')} </p>
                                        <p>End Date: {formatInTimeZone(new Date(booking?.endDate), 'UTC', 'EEEE MMMM do yyyy')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null
    )
}

export default UserPage;
