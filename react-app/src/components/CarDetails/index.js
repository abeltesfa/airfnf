import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addBookings, getCarBookings } from "../../store/bookings";
import { deleteCar, getAllCars } from "../../store/cars";
import BookingDetails from "../BookingDetails";
import ErrorModal from "../ErrorModal";
import { addHours, addDays } from 'date-fns';
import './CarDetails.css'
// import { formatInTimeZone } from 'date-fns-tz';

const CarDetails = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const bookings = useSelector(state => state.bookings);
    const specificCar = cars[pCarId.carId];
    // const userId = sessionUser.id;
    const carId = pCarId.carId;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    // const [editBookingForm, setEditBookingForm] = useState(false);
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const convertedToday = addHours(new Date(), timezoneOffset);
    const currBookingsArr = [];
    const currentBookings = Object.values(bookings).map(booking => currBookingsArr.push([addHours(new Date(booking.startDate), timezoneOffset), addHours(new Date(booking.endDate), timezoneOffset)]))
    console.log(currBookingsArr)


    // const dateRangeArr = [];
    // const dateRange = (start, end) => {
    //     dateRangeArr.push(start);
    //     while (start <= end){
    //         dateRangeArr.push(addDays(start, 1))
    //     }
    //     console.log(dateRangeArr)
    // };
    // if(currBookingsArr){
    //     dateRange(addHours(new Date(), timezoneOffset), addHours(addDays(new Date(), 10), timezoneOffset))
    //     console.log(addHours(new Date(currBookingsArr[0][0]), timezoneOffset), addHours(new Date(currBookingsArr[0][1]), timezoneOffset))
    // }
    // if(currBookingsArr){

    //     dateRange(new Date(currBookingsArr[0][0]), new Date(currBookingsArr[0][1]))
    // }


    useEffect(() => {
        dispatch(getAllCars())
        dispatch(getCarBookings(pCarId.carId))
    }, [dispatch, pCarId])

    useEffect(() => {
        const errors = [];
        if (new Date(startDate) < convertedToday) {
            errors.push('Start date cannot be in the past.')
        }
        if (new Date(endDate) < new Date(startDate)) {
            errors.push('End date must be after the start date')
        }
        if (currBookingsArr) {
            for (let i = 0; i < currBookingsArr.length; i++) {
                if ((new Date(currBookingsArr[i][0]) <= new Date(startDate)) && (new Date(currBookingsArr[i][1]) >= new Date(startDate))) {
                    errors.push('Start Date is within already existing booking');
                } else if ((new Date(currBookingsArr[i][0]) <= new Date(endDate)) && (new Date(currBookingsArr[i][1]) >= new Date(endDate))) {
                    errors.push('End Date is within already existing booking');
                }
            }
        }


        setValidationErrors(errors);
    }, [startDate, endDate]);

    const onDelete = async () => {
        await dispatch(deleteCar(pCarId.carId))
        history.push('/');
    }

    // const bookingOnDelete = async (bookingId) => {
    //     await dispatch(deleteBooking(bookingId))
    // }

    const onSubmit = async (e) => {
        e.preventDefault();

        // setHasSubmitted(true);
        if (validationErrors.length) {
            setShowModal(true)
        } else {
            const createdBooking = await dispatch(addBookings(carId, startDate, endDate))
            if (createdBooking) {
                setStartDate('');
                setEndDate('');
            }
        }


        return () => {

            // setHasSubmitted(false);
        }
    }

    // const showForm = () => {
    //     if (!editBookingForm) {
    //         setEditBookingForm(true)
    //     } else setEditBookingForm(false)
    // }

    console.log(Object.keys(bookings).length)
    return (
        specificCar && specificCar.images ?
            <div className="page-outer">
                <div className="details-container">
                    <h1>Car Details</h1>

                    <div className="details-img-container">
                        {specificCar.images.map(pic => (
                            <div key={pic.id}>
                                <img className="details-img" src={pic.url} onError={(e) => { e.target.onError = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/2137/2137884.png' }} alt=''></img>
                            </div>
                        ))}
                    </div>
                    <p>{specificCar.carYear} {specificCar.make} {specificCar.model}</p>
                    <p>{specificCar.description}</p>
                    <p>Location: {specificCar.city} {specificCar.state} {specificCar.country}</p>
                    <p>Price: ${specificCar.price}</p>
                    {specificCar?.userId === sessionUser?.id && (
                        <div>
                            <NavLink to={`/cars/${specificCar.id}/edit`} className="details-edit-car-btn">
                                Car Edit
                            </NavLink>
                            <div>
                                <button className="details-delete-car-btn" onClick={onDelete}>Delete Car</button>
                            </div>
                        </div>
                    )}

                    <div>
                        <h3>Current Bookings</h3>
                        {Object.keys(bookings).length ?
                            null
                            : <h4>No Current Bookings listed...</h4>
                        }
                        <div>
                            {Object.values(bookings).map((booking) => (
                                <div key={booking?.id}>
                                    <BookingDetails booking={booking} carId={carId} sessionUser={sessionUser} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {sessionUser ?
                        <div>
                            <h2>Create Booking</h2>
                            {/* {hasSubmitted && validationErrors.length > 0 && (
                        <div>
                            The following errors were found:
                            <ul>
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                            <ErrorModal hideModal={() => setShowModal(false)} showModal={showModal} validationErrors={validationErrors} />
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
                        : null
                    }
                </div>
            </div>
            : null
    )
}

export default CarDetails;
