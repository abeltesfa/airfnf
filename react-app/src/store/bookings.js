const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';

const actionLoadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
});

export const getUserBookings = (userId) => async(dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(actionLoadBookings(bookings));
        return bookings;
    }
}

export const getCarBookings = (carId) => async(dispatch) => {
    const response = await fetch(`/api/bookings/cars/${carId}`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(actionLoadBookings(bookings));
        return bookings;
    }
}

const bookingsReducer = (state= {}, action) => {
    switch(action.type) {
        case LOAD_BOOKINGS:
            const newState1 = {};
            action.bookings.user_bookings.forEach(booking => {
                newState1[booking.id] = booking;
            })
            return newState1;

        default:
            return state;
    }
}

export default bookingsReducer;
