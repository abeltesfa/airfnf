import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/review";
import ErrorModal from "../ErrorModal";

const CreateReview = ({carId}) => {
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const errors = [];

        if(!rating) {
            errors.push('Please select a rating.')
        }
        if(body.length <= 0 || !body.trim().length){
            errors.push('Please enter a review.')
        }
        if(body.length > 255){
            errors.push('Review must be 255 characters or less.')
        }

        setValidationErrors(errors);
    }, [rating, body])

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validationErrors.length) {
            setShowModal(true);
        } else {
            const createdReview = await dispatch(addReview(carId, rating, body))
            if(createdReview){
                setRating('');
                setBody('');
            }
        }
        return () => {

        }
    }

    return (
        <div className="create-review-container">
            <h4>Leave a review...</h4>
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
                    <textarea id="body" rows="7" cols="70" className="car-textarea" onChange={e => setBody(e.target.value)} value={body}></textarea>
                </div>
                <br></br>
                <span>* This field is required</span>

                <div>
                <br></br>
                    <button className="single-btn-airbnb-color">Submit Review</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReview;
