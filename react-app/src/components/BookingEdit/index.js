import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { editBookings } from "../../store/bookings";
import { formatInTimeZone } from 'date-fns-tz';


const BookingEdit = ({userId, carId, booking, hideForm}) => {
    const dispatch = useDispatch();
    const bookingId = booking.id;
    const convertedStartDate = formatInTimeZone(new Date(booking?.startDate), 'UTC', 'yyyy-MM-dd');
    const convertedEndDate = formatInTimeZone(new Date(booking?.endDate), 'UTC', 'yyyy-MM-dd');
    const [startDate, setStartDate] = useState(convertedStartDate);
    const [endDate, setEndDate] = useState(convertedEndDate);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        const errors = [];

        setValidationErrors(errors);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        const editedBooking = await dispatch(editBookings(bookingId, userId, carId, startDate, endDate))

        if (editedBooking){
            hideForm();
        }
        return () => {

            setHasSubmitted(false);
        }
    }


    return (
        <div>
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
                    <button type='button' onClick={hideForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default BookingEdit;
