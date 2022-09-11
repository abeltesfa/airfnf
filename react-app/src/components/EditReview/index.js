import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/review';
import ErrorModal from '../ErrorModal';

function EditReview({ review, sessionUser, carId, hideForm }) {
    const [rating, setRating] = useState(review?.rating);
    const [body, setBody] = useState(review?.body);
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();
    const reviewId = review?.id

    useEffect(() => {
        const errors = [];

        if (!rating) {
            errors.push('Please select a rating.')
        }
        if (body.length <= 0 || !body.trim().length) {
            errors.push('Please enter a review.')
        }
        if (body.length > 255) {
            errors.push('Review must be 255 characters or less.')
        }

        setValidationErrors(errors);
    }, [rating, body])

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length) {
            setShowModal(true);
        } else {
            const editedReview = await dispatch(editReview(reviewId, rating, body))

            if (editedReview){
                hideForm();
            }
        }
        return () => {

        }
    }

    return (
        <div>
            <ErrorModal hideModal={() => setShowModal(false)} showModal={showModal} validationErrors={validationErrors} />
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="rating">Rating:*</label>
                    <select id="rating" onChange={e => setRating(e.target.value)} value={rating}>
                        <option value="" disabled>Select a Rating...</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="body">Review:*</label>
                    <textarea id="body" onChange={e => setBody(e.target.value)} value={body}></textarea>
                </div>
                <div>
                    <button className="details-bookings-edit-btn">Submit</button>
                    <button type='button' className="details-bookings-edit-btn" onClick={hideForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditReview;
