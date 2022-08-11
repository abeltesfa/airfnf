import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/bookings";
import BookingEdit from "../BookingEdit";
import { formatInTimeZone } from 'date-fns-tz';


function BookingDetails({ booking, carId, sessionUser }) {
    const dispatch = useDispatch();
    const [showEditBooking, setShowEditBooking] = useState(false);

    const bookingOnDelete = async (bookingId) => {
        await dispatch(deleteBooking(bookingId))
    }

    const convertedStartDate = formatInTimeZone(new Date(booking?.startDate), 'UTC', 'EEEE MMMM do yyyy');
    const convertedEndDate = formatInTimeZone(new Date(booking?.endDate), 'UTC', 'EEEE MMMM do yyyy');

    return (
        <div>
            {!showEditBooking ?
                <div>
                    <p>Start Date: {convertedStartDate} </p>
                    <p>End Date: {convertedEndDate}</p>
                    {sessionUser?.id === booking?.userId && (
                        <div>
                            <button className="details-bookings-edit-btn" onClick={() => setShowEditBooking(true)}>Edit Booking</button>
                            <button className="details-bookings-edit-btn" onClick={() => bookingOnDelete(booking.id)}>Delete Booking</button>
                        </div>
                    )}

                </div>
                : <BookingEdit booking={booking} sessionUser={sessionUser} carId={carId} hideForm={() => setShowEditBooking(false)} />
            }
        </div>
    )
}

export default BookingDetails;
