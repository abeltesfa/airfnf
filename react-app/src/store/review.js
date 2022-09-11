const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEWS = 'reviews/ADD_REVIEWS';

const actionLoadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const actionAddReviews = (review) => ({
    type: ADD_REVIEWS,
    review
})

export const getCarReviews = (carId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${carId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionLoadReviews(reviews));
        return reviews;
    }
}

export const addReview = (carId, rating, body) => async(dispatch) => {
    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            carId,
            rating,
            body
        })
    })
    if(response.ok){
        const review = await response.json();
        dispatch(actionAddReviews(review));
        return review;
    }
}

export const editReview = (reviewId, carId, rating, body) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            carId,
            rating,
            body
        })
    })
    if(response.ok) {
        const review = await response.json();
        dispatch(actionAddReviews(review));
        return review;
    }
}

const reviewsReducer =(state = {}, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:
            const newState = {};
            console.log(action.reviews);
            action.reviews.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;

        case ADD_REVIEWS:
            const newState2 = {...state};
            newState2[action.review.id] = action.review;
            return newState2;

        default:
            return state;
    }
}

export default reviewsReducer;
