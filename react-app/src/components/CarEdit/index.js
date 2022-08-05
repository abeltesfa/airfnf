import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCars } from "../../store/cars";

const CarEdit = () => {
    const dispatch = useDispatch()
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const specificCar = cars[pCarId.carId];

    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])


    const [carYear, setCarYear] = useState(specificCar.carYear);
    const [make, setMake] = useState(specificCar.make);
    const [model, setModel] = useState(specificCar.model);
    const [city, setCity] = useState(specificCar.city);
    const [state, setState] = useState(specificCar.state);
    const [country, setCountry] = useState(specificCar.country);
    const [description, setDescription] = useState(specificCar.description);
    const [price, setPrice] = useState(specificCar.price);
    const [image1, setImage1] = useState(specificCar.images[0].url);
    const [image2, setImage2] = useState(specificCar.images[1].url);
    const [image3, setImage3] = useState(specificCar.images[2].url);
    const [image4, setImage4] = useState(specificCar.images[3].url);
    const [image5, setImage5] = useState(specificCar.images[4].url);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(()=> {
        const errors = [];

        setValidationErrors(errors);
    },[]);

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Car Edit</h1>
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
                        <input id="caryear" type="number" onChange={e => setCarYear(e.target.value)} value={carYear} />
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
                        <input id="price" type="number" onChange={e => setPrice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label htmlFor="image1">Image1:</label>
                        <input id="image1" type="url" onChange={e => setImage1(e.target.value)} value={image1} />
                    </div>
                    <div>
                        <label htmlFor="image2">Image2:</label>
                        <input id="image2" type="url" onChange={e => setImage2(e.target.value)} value={image2} />
                    </div>
                    <div>
                        <label htmlFor="image3">Image3:</label>
                        <input id="image3" type="url" onChange={e => setImage3(e.target.value)} value={image3} />
                    </div>
                    <div>
                        <label htmlFor="image4">Image4:</label>
                        <input id="image4" type="url" onChange={e => setImage4(e.target.value)} value={image4} />
                    </div>
                    <div>
                        <label htmlFor="image5">Image5:</label>
                        <input id="image5" type="url" onChange={e => setImage5(e.target.value)} value={image5} />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )

}

export default CarEdit;
