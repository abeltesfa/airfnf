import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editBookings, getCarBookings } from "../../store/bookings";
import { addHours, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import ErrorModal from "../ErrorModal";


const BookingEdit = ({ carId, booking, hideForm, sessionUser}) => {
    const dispatch = useDispatch();
    const bookingId = booking.id;
    const bookings = useSelector(state => state.bookings);
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const timezoneToday = addHours(new Date(), timezoneOffset);
    const convertedStartDate = formatInTimeZone(new Date(booking?.startDate), 'UTC', 'yyyy-MM-dd');
    const convertedEndDate = formatInTimeZone(new Date(booking?.endDate), 'UTC', 'yyyy-MM-dd');
    const [startDate, setStartDate] = useState(convertedStartDate);
    const [endDate, setEndDate] = useState(convertedEndDate);
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const formatToday = format(new Date(), 'yyyy-MM-dd');
    const convertedToday = addHours(new Date(formatToday), timezoneOffset);
    const currBookingsArr = [];
    Object.values(bookings).map(booking => currBookingsArr.push([addHours(new Date(booking.startDate), timezoneOffset), addHours(new Date(booking.endDate), timezoneOffset), booking.id]))

    useEffect(() => {
        const errors = [];
        if(!startDate){
            errors.push('Start date must be entered')
        }
        if(!endDate){
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
                if (new Date(startDate) < new Date(currBookingsArr[i][0]) && new Date(endDate) > new Date(currBookingsArr[i][1]) && currBookingsArr[i][2] !== bookingId) {
                    errors.push('Booking includes existing booking')
                    setValidationErrors(errors);
                    return
                }
                else if ((new Date(currBookingsArr[i][0]) <= new Date(startDate)) && (new Date(currBookingsArr[i][1]) >= new Date(startDate)) && currBookingsArr[i][2] !== bookingId) {
                    errors.push('Start Date is within already existing booking');
                    setValidationErrors(errors);
                    return
                } else if ((new Date(currBookingsArr[i][0]) <= new Date(endDate)) && (new Date(currBookingsArr[i][1]) >= new Date(endDate)) && currBookingsArr[i][2] !== bookingId) {
                    errors.push('End Date is within already existing booking');
                    setValidationErrors(errors);
                    return
                }
            }
        }
        setValidationErrors(errors);
    }, [startDate, endDate]);

    useEffect(() => {
        dispatch(getCarBookings(carId))
    }, [dispatch, carId])

    const onSubmit = async (e) => {
        e.preventDefault();
        // setHasSubmitted(true);
        if (validationErrors.length) {
            setShowModal(true)
        } else {

            const editedBooking = await dispatch(editBookings(bookingId, carId, startDate, endDate))

            if (editedBooking){
                hideForm();
            }
        }

        return () => {
            // setHasSubmitted(false);
        }
    }


    return (
        <div>
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
            <form className='edit-booking-form' onSubmit={onSubmit}>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input id="startDate" type="date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input id="endDate" type="date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                </div>
                <div>
                    <button className="details-bookings-edit-btn">Submit</button>
                    <button type='button' className="details-bookings-edit-btn" onClick={hideForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default BookingEdit;
