import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserBookings } from "../../store/bookings";
import { getAllCars } from "../../store/cars";
import { formatInTimeZone } from 'date-fns-tz';


const UserPage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);
    const cars = useSelector(state => state.cars)

    useEffect(() => {
        dispatch(getUserBookings(sessionUser.id))
        dispatch(getAllCars())
    }, [dispatch, sessionUser])


    return (
        bookings ?
            <div className="page-outer">
                <div>
                    <h1>User Profile Page</h1>
                    <div>
                        <h3>My Bookings</h3>
                        <div>
                            {Object.values(bookings).map((booking) => (
                                <div key={booking?.id}>
                                    <NavLink to={`/cars/${booking.carId}`}>
                                        <p>{cars[booking.carId]?.carYear} {cars[booking.carId]?.make} {cars[booking.carId]?.model}</p>
                                        <img src={cars[booking.carId]?.images[0]?.url} alt=""></img>
                                    </NavLink>
                                    <p>Start Date: {formatInTimeZone(new Date(booking?.startDate), 'UTC', 'EEEE MMMM do yyyy')} </p>
                                    <p>End Date: {formatInTimeZone(new Date(booking?.endDate), 'UTC', 'EEEE MMMM do yyyy')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            : null
    )
}

export default UserPage;
