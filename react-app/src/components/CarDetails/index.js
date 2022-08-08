import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getCarBookings } from "../../store/bookings";
import { deleteCar, getAllCars } from "../../store/cars";


const CarDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const bookings = useSelector(state => state.bookings)
    const specificCar = cars[pCarId.carId];

    useEffect(() => {
        dispatch(getAllCars())
        dispatch(getCarBookings(pCarId.carId))
    }, [dispatch, pCarId])

    const onDelete = async () => {
        await dispatch(deleteCar(pCarId.carId))
        history.push('/');
    }

    return (
        specificCar && specificCar.images ?
            <div>
                <h1>Car Detail</h1>
                <div>
                    <button onClick={onDelete}>Delete Car</button>
                </div>
                <div>
                    {specificCar.images.map(pic => (
                        <div key={pic.id}>
                            <img src={pic.url} alt=''></img>
                        </div>
                    ))}
                </div>
                <p>{specificCar.carYear} {specificCar.make} {specificCar.model}</p>
                <p>{specificCar.description}</p>
                <p>Location: {specificCar.city} {specificCar.state} {specificCar.country}</p>
                <p>Price: ${specificCar.price}</p>
                <NavLink to={`/cars/${specificCar.id}/edit`}>
                    Car Edit
                </NavLink>
                <div>
                    <h3>Current Bookings</h3>
                    <div>
                        {Object.values(bookings).map((booking) => (
                            <div key={booking?.id}>
                                <p>Start Date: {booking.startDate} </p>
                                <p>End Date: {booking.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : null
    )
}

export default CarDetails;
