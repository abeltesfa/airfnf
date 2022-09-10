import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorModal from "../ErrorModal";

const createReview = () => {
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
                    <textarea id="body" className="car-textarea" onChange={e => setBody(e.target.value)} value={body}></textarea>
                </div>
                <span>* This field is required</span>
                <div>
                    <button className="single-btn-airbnb-color">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default createReview;
