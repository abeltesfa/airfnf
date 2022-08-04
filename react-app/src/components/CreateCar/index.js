import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateCar = () => {
    const [carYear, setCarYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)

    useEffect(()=> {
        const errors = [];

        setValidationErrors(errors);
    },[]);

    const onSubmit = e => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        const carFormInformation = {
            userId: user.id,
            carYear,
            make,
            model,
            city,
            state,
            country,
            description,
            price
        }

        console.log(carFormInformation);

        setHasSubmitted(false);

    }

    return (
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="carYear">Car Year:</label>
                    <input id="caryear" type="text" onChange={e => setCarYear(e.target.value)} value={carYear} />
                </div>
                <div>
                    <label htmlFor="make">Make:</label>
                    <input id="make" type="text" onChange={e => setMake(e.target.value)} value={make} />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input id="model" type="text" onChange={e => setModel(e.target.value)} value={model} />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input id="city" type="text" onChange={e => setCity(e.target.value)} value={city} />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input id="state" type="text" onChange={e => setState(e.target.value)} value={state} />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input id="country" type="text" onChange={e => setCountry(e.target.value)} value={country} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="text" onChange={e => setPrice(e.target.value)} value={price} />
                </div>
                <div>
                    <label htmlFor="image1">Image1:</label>
                    <input id="image1" type="text" onChange={e => setImage1(e.target.value)} value={image1} />
                </div>
                <div>
                    <label htmlFor="image2">Image2:</label>
                    <input id="image2" type="text" onChange={e => setImage2(e.target.value)} value={image2} />
                </div>
                <div>
                    <label htmlFor="image3">Image3:</label>
                    <input id="image3" type="text" onChange={e => setImage3(e.target.value)} value={image3} />
                </div>
                <div>
                    <label htmlFor="image4">Image4:</label>
                    <input id="image4" type="text" onChange={e => setImage4(e.target.value)} value={image4} />
                </div>
                <div>
                    <label htmlFor="image5">Image5:</label>
                    <input id="image5" type="text" onChange={e => setImage5(e.target.value)} value={image5} />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>

        </div>
    )

}

export default CreateCar;
