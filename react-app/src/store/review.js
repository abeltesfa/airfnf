const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';

const actionLoadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const getCarReviews = (carId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${carId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionLoadReviews(reviews));
        return reviews;
    }
}

const reviewsReducer =(state = {}, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:
            const newState = {};
            action.reviews.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
