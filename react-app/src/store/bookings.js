const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
const ADD_BOOKINGS = 'bookings/ADD_BOOKINGS';

const actionLoadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
});

const actionAddBooking = (booking) => ({
    type:ADD_BOOKINGS,
    booking
})

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

export const addBookings = (userId, carId, startDate, endDate) => async(dispatch) => {
    const response = await fetch('/api/bookings/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            carId,
            startDate,
            endDate
        })
    })
    if(response.ok) {
        const booking = await response.json();
        dispatch(actionAddBooking(booking));
        return booking;
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

        case ADD_BOOKINGS:
            const newState2 = {...state};
            newState2[action.booking.id] = action.booking;
            return newState2;

        default:
            return state;
    }
}

export default bookingsReducer;
