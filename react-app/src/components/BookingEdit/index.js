import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { editBookings } from "../../store/bookings";


const BookingEdit = ({userId, carId, booking, hideForm}) => {
    const dispatch = useDispatch();
    const bookingId = booking.id
    const [startDate, setStartDate] = useState(booking?.startDate);
    const [endDate, setEndDate] = useState(booking?.endDate);
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    console.log(booking?.startDate)

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
