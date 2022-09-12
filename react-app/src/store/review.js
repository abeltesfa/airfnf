const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEWS = 'reviews/ADD_REVIEWS';
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS';

const actionLoadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const actionAddReviews = (review) => ({
    type: ADD_REVIEWS,
    review
});

const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEWS,
    reviewId
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

export const editReview = (reviewId, rating, body) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

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

export const deleteReview = (reviewId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(actionDeleteReview(reviewId))
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

        case ADD_REVIEWS:
            const newState2 = {...state};
            newState2[action.review.id] = action.review;
            return newState2;

        case DELETE_REVIEWS:
            const newState3 = {...state};
            delete newState3[action.reviewId]
            return newState3;

        default:
            return state;
    }
}

export default reviewsReducer;
