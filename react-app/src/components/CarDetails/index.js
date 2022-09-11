import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addBookings, getCarBookings } from "../../store/bookings";
import { deleteCar, getAllCars } from "../../store/cars";
import BookingDetails from "../BookingDetails";
import ErrorModal from "../ErrorModal";
import { addHours, format } from 'date-fns';
import './CarDetails.css'
import { getCarReviews } from "../../store/review";
import CreateReview from "../CreateReview";
// import { formatInTimeZone } from 'date-fns-tz';

const CarDetails = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const bookings = useSelector(state => state.bookings);
    const reviews = useSelector(state => state.reviews);
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
    const timezoneToday = addHours(new Date(), timezoneOffset);
    const currBookingsArr = [];
    Object.values(bookings).map(booking => currBookingsArr.push([addHours(new Date(booking.startDate), timezoneOffset), addHours(new Date(booking.endDate), timezoneOffset)]))
    const formatToday = format(new Date(), 'yyyy-MM-dd');
    const convertedToday = addHours(new Date(formatToday), timezoneOffset);


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
        dispatch(getCarReviews(pCarId.carId))
    }, [dispatch, pCarId])

    useEffect(() => {
        const errors = [];
        if (!startDate) {
            errors.push('Start date must be entered')
        }
        if (!endDate) {
            errors.push('End date must be entered')
        }
        if (addHours(new Date(startDate), timezoneOffset) < convertedToday) {
            errors.push('Start date cannot be in the past.')
        }
        if (new Date(endDate) < new Date(startDate)) {
            errors.push('End date must be after the start date')
        }
        if (currBookingsArr) {
            for (let i = 0; i < currBookingsArr.length; i++) {
                if ((new Date(startDate)) < new Date(currBookingsArr[i][0]) && new Date(endDate) > new Date(currBookingsArr[i][1])) {
                    errors.push('Booking includes existing booking')
                    setValidationErrors(errors);
                    return
                }
                else if ((new Date(currBookingsArr[i][0]) <= addHours(new Date(startDate), timezoneOffset)) && (new Date(currBookingsArr[i][1]) >= addHours(new Date(startDate), timezoneOffset))) {
                    errors.push('Start Date is within already existing booking');
                    setValidationErrors(errors);
                    return
                } else if ((new Date(currBookingsArr[i][0]) <= addHours(new Date(endDate), timezoneOffset)) && (new Date(currBookingsArr[i][1]) >= addHours(new Date(endDate), timezoneOffset))) {
                    errors.push('End Date is within already existing booking');
                    setValidationErrors(errors);
                    return
                }
            }
        }
        setValidationErrors(errors);
    }, [startDate, endDate]);

    const onDelete = async () => {
        await dispatch(deleteCar(pCarId.carId))
        history.push('/');
    }

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

    return (
        specificCar && specificCar.images ?
            <div className="page-outer">
                <div className="page-margin-add"></div>
                <div className="page-info">
                    <div className="details-container">
                        <h1>Car Details</h1>

                        <div className="details-img-container">
                            {/* {specificCar.images.map(pic => (
                            <div key={pic.id}>
                                <img className="details-img" src={pic.url} onError={(e) => { e.target.onError = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/2137/2137884.png' }} alt=''></img>
                            </div>
                        ))} */}
                            <div className="details-img-big">
                                <img src={specificCar.images[0]?.url} className='details-img-big-img' onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt='' />
                            </div>
                            <div className="details-img-midtop">
                                <img src={specificCar.images[1]?.url} className="details-img-midtop-img" onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt='' />
                            </div>
                            <div className="details-img-midbottom">
                                <img src={specificCar.images[2]?.url} className="details-img-midbottom-img" onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt='' />
                            </div>
                            <div className="details-img-endtop">
                                <img src={specificCar.images[3]?.url} className="details-img-endtop-img" onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt='' />
                            </div>
                            <div className="details-img-endbottom">
                                <img src={specificCar.images[4]?.url} className="details-img-endbottom" onError={(e) => { e.target.onError = null; e.target.src = 'https://instaspambucket.s3.amazonaws.com/410ad2d60dcb491fad634907562cd176.png' }} alt='' />
                            </div>
                        </div>
                        <div className="details-cardetails-container">
                            <p>{specificCar.carYear} {specificCar.make} {specificCar.model}</p>
                            <p>{specificCar.description}</p>
                            <p>Location: {specificCar.city} {specificCar.state} {specificCar.country}</p>
                            <p>Price: ${specificCar.price}</p>
                        </div>
                        {specificCar?.userId === sessionUser?.id && (
                            <div className="details-editanddelete-btns">
                                <div>
                                    <NavLink to={{ pathname: `/cars/${specificCar.id}/edit`, state: { specificCar: specificCar } }} className="details-edit-car-btn">
                                        Car Edit
                                    </NavLink>
                                </div>
                                <div>
                                    <button className="details-delete-car-btn" onClick={onDelete}>Delete Car</button>
                                </div>
                            </div>
                        )}


                        <div className='details-createandcurrent-container'>
                            {sessionUser ?
                                <div className="details-create-booking-container">
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
                            <div className="details-currentbookings-container">
                                <h3>Current Bookings</h3>
                                {Object.keys(bookings).length ?
                                    null
                                    : <h4>No Current Bookings listed...</h4>
                                }
                                <div>
                                    {Object.values(bookings).map((booking) => (
                                        <div className="details-currentbookings-single" key={booking?.id}>
                                            <BookingDetails booking={booking} carId={carId} sessionUser={sessionUser} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Reviews</h3>
                            <div>
                                <CreateReview carId={carId} />
                            </div>
                            <div>
                                {Object.values(reviews).map((review) => (
                                    <div className="details-currentreviews-single" key={review?.id}>
                                        {review?.body}
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

export default CarDetails;
