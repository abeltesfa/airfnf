import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review";
import EditReview from "../EditReview";

function ReviewDetails({review, carId, sessionUser}) {
    const dispatch = useDispatch();
    const [showEditReview, setShowEditReview] = useState(false);
    const reviewId = review?.id

    const reviewOnDelete = async() => {
        await dispatch(deleteReview(reviewId))
    }

    return (
        <div>
            {!showEditReview ?
            <div className="details-singlereview">
                <p>Rating: {review?.rating}</p>
                <p>Review: </p>
                <p>{review?.body}</p>
                <p>Review Author: {review?.username}</p>
                {sessionUser?.id === review?.userId && (
                    <div>
                        <button className="details-bookings-edit-btn" onClick={() => setShowEditReview(true)}>Edit Review</button>
                        <button className="details-bookings-edit-btn" onClick={() => reviewOnDelete()}>Delete Review</button>
                    </div>
                )}
            </div>
            : <EditReview review={review} sessionUser={sessionUser} carId={carId} hideForm={() => setShowEditReview(false)}/>}

        </div>
    )
}

export default ReviewDetails;
