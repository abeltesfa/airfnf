import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/bookings";
import BookingEdit from "../BookingEdit";


function BookingDetails({ booking, userId, carId }) {
    const dispatch = useDispatch();
    const [showEditBooking, setShowEditBooking] = useState(false);

    const bookingOnDelete = async (bookingId) => {
        await dispatch(deleteBooking(bookingId))
    }

    return (
        <div>
            {!showEditBooking ?
                <div>
                    <p>Start Date: {booking.startDate} </p>
                    <p>End Date: {booking.endDate}</p>
                    <button onClick={() => setShowEditBooking(true)}>Edit Booking</button>
                    <button onClick={()=> bookingOnDelete(booking.id)}>Delete Booking</button>
                </div>
                : <BookingEdit booking={booking} userId={userId} carId={carId} hideForm={()=> setShowEditBooking(false)}/>
            }
        </div>
    )
}

export default BookingDetails;
