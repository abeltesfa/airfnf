import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addBookings, getCarBookings } from "../../store/bookings";
import { deleteCar, getAllCars } from "../../store/cars";


const CarDetails = ({sessionUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const bookings = useSelector(state => state.bookings);
    const specificCar = cars[pCarId.carId];
    const userId = sessionUser.id;
    const carId = pCarId.carId;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(getAllCars())
        dispatch(getCarBookings(pCarId.carId))
    }, [dispatch, pCarId])

    useEffect(() => {
        const errors = [];

        setValidationErrors(errors);
    }, [dispatch]);

    const onDelete = async () => {
        await dispatch(deleteCar(pCarId.carId))
        history.push('/');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        const createdBooking = await dispatch(addBookings(userId, carId, startDate, endDate))

        return () => {

            setHasSubmitted(false);
        }
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
                <div>
                    <h2>Create Booking</h2>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <div>
                            The following errors were found:
                            <ul>
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="startDate">Start Date:</label>
                            <input id="startDate" type="date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                        </div>
                        <div>
                            <label htmlFor="endDate">End Date:</label>
                            <input id="endDate" type="date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            : null
    )
}

export default CarDetails;
