import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCars } from "../../store/cars";
import { useHistory } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import './CreateCar.css'

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
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const rePrice = /^\d*(\.\d{0,2})?$/
        const errors = [];
        if (!carYear) {
            errors.push('Please select a car year.');
        }
        if (!make) {
            errors.push('Please select a make.')
        }
        if (model.length <= 0 || !model.trim().length) {
            errors.push('Please enter a model name.');
        }
        if (model.length > 40) {
            errors.push('Model name cannot be more than 40 characters.');
        }
        if (city.length <= 0 || !city.trim().length) {
            errors.push('Please enter a city.');
        }
        if (city.length > 85) {
            errors.push('City name cannot be more than 85 characters.');
        }
        if (state.length <= 0 || !state.trim().length) {
            errors.push('Please enter a state. Enter N/A if not applicable.');
        }
        if (state.length > 20) {
            errors.push('State name cannot be longer than 20 characters.');
        }
        if (country.length <= 0 || !country.trim().length) {
            errors.push('Please enter a country.');
        }
        if (country.length > 57) {
            errors.push('Country name cannot be more than 57 characters.');
        }
        if (description.length <= 0 || !description.trim().length) {
            errors.push('Please enter a description');
        }
        if (description.length > 1000) {
            errors.push('Description cannot be more than 1000 characters.');
        }
        if (price <= 0) {
            errors.push('Price cannot be zero or a negative number')
        }
        if (!rePrice.test(price)) {
            errors.push('Please enter valid price with 2 decimal places')
        }
        if (!image1) {
            errors.push('Please enter a value for image1')
        }
        if (!image2) {
            errors.push('Please enter a value for image2')
        }
        if (!image3) {
            errors.push('Please enter a value for image3')
        }
        if (!image4) {
            errors.push('Please enter a value for image4')
        }
        if (!image5) {
            errors.push('Please enter a value for image5')
        }
        if (!image1.endsWith('.jpg') && !image1.endsWith('.jpeg') && !image1.endsWith('.png')) {
            errors.push('Image1 must end in .jpg, .jpeg, or .png')
        }
        if (!image2.endsWith('.jpg') && !image2.endsWith('.jpeg') && !image2.endsWith('.png')) {
            errors.push('Image2 must end in .jpg, .jpeg, or .png')
        }
        if (!image3.endsWith('.jpg') && !image3.endsWith('.jpeg') && !image3.endsWith('.png')) {
            errors.push('Image3 must end in .jpg, .jpeg, or .png')
        }
        if (!image4.endsWith('.jpg') && !image4.endsWith('.jpeg') && !image4.endsWith('.png')) {
            errors.push('Image4 must end in .jpg, .jpeg, or .png')
        }
        if (!image5.endsWith('.jpg') && !image5.endsWith('.jpeg') && !image5.endsWith('.png')) {
            errors.push('Image5 must end in .jpg, .jpeg, or .png')
        }

        setValidationErrors(errors);
    }, [carYear, make, model, city, state, country, description, price, image1, image2, image3, image4, image5]);

    const onSubmit = async (e) => {
        e.preventDefault();

        // setHasSubmitted(true);
        if (validationErrors.length) {
            setShowModal(true)
        } else {

            const createdCar = await dispatch(addCars(carYear,
                make,
                model,
                city,
                state,
                country,
                description,
                price,
                image1,
                image2,
                image3,
                image4,
                image5))

            if (createdCar) {
                history.push('/');
            }
        }
        return () => {

        }

    }

    return (
        <div className="page-outer">
            <div className="page-margin-add"></div>
            <div className="page-info">
                <div className="car-create-form-container">
                    <h1>Create a Car Post</h1>
                    {/* {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )} */}
                    <ErrorModal hideModal={() => setShowModal(false)} showModal={showModal} validationErrors={validationErrors} />
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="carYear">Car Year:*</label>
                            <select id="caryear" onChange={e => setCarYear(e.target.value)} value={carYear}>
                                <option value="" disabled>Select a Year...</option>
                                <option value={2000}>2000</option>
                                <option value={2001}>2001</option>
                                <option value={2002}>2002</option>
                                <option value={2003}>2003</option>
                                <option value={2004}>2004</option>
                                <option value={2005}>2005</option>
                                <option value={2006}>2006</option>
                                <option value={2007}>2007</option>
                                <option value={2008}>2008</option>
                                <option value={2009}>2009</option>
                                <option value={2010}>2010</option>
                                <option value={2011}>2011</option>
                                <option value={2012}>2012</option>
                                <option value={2013}>2013</option>
                                <option value={2014}>2014</option>
                                <option value={2015}>2015</option>
                                <option value={2016}>2016</option>
                                <option value={2017}>2017</option>
                                <option value={2018}>2018</option>
                                <option value={2019}>2019</option>
                                <option value={2020}>2020</option>
                                <option value={2021}>2021</option>
                                <option value={2022}>2022</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="make">Make:*</label>
                            <select id="make" onChange={e => setMake(e.target.value)} value={make}>
                                <option value="" disabled>Select a Make...</option>
                                <option value={'Acura'}>Acura</option>
                                <option value={'Alfa Romeo'}>Alfa Romeo</option>
                                <option value={'Aston Martin'}>Aston Martin</option>
                                <option value={'Audi'}>Audi</option>
                                <option value={'BMW'}>BMW</option>
                                <option value={'Buick'}>Buick</option>
                                <option value={'Cadillac'}>Cadillac</option>
                                <option value={'Chevrolet'}>Chevrolet</option>
                                <option value={'Chrysler'}>Chrysler</option>
                                <option value={'Dodge'}>Dodge</option>
                                <option value={'Ferrari'}>Ferrari</option>
                                <option value={'FIAT'}>FIAT</option>
                                <option value={'Ford'}>Ford</option>
                                <option value={'Genesis'}>Genesis</option>
                                <option value={'GMC'}>GMC</option>
                                <option value={'Honda'}>Honda</option>
                                <option value={'HUMMER'}>HUMMER</option>
                                <option value={'Hyundai'}>Hyundai</option>
                                <option value={'Infiniti'}>Infiniti</option>
                                <option value={'Isuzu'}>Isuzu</option>
                                <option value={'Jaguar'}>Jaguar</option>
                                <option value={'Jeep'}>Jeep</option>
                                <option value={'Kia'}>Kia</option>
                                <option value={'Lamborghini'}>Lamborghini</option>
                                <option value={'Land Rover'}>Land Rover</option>
                                <option value={'Lexus'}>Lexus</option>
                                <option value={'Lincoln'}>Lincoln</option>
                                <option value={'Lotus'}>Lotus</option>
                                <option value={'Lucid'}>Lucid</option>
                                <option value={'Maserati'}>Maserati</option>
                                <option value={'Mazda'}>Mazda</option>
                                <option value={'Mercedes-Benz'}>Mercedes-Benz</option>
                                <option value={'Mercury'}>Mercury</option>
                                <option value={'MINI'}>MINI</option>
                                <option value={'Mitsubishi'}>Mitsubishi</option>
                                <option value={'Nissan'}>Nissan</option>
                                <option value={'Polestar'}>Polestar</option>
                                <option value={'Pontiac'}>Pontiac</option>
                                <option value={'Porsche'}>Porsche</option>
                                <option value={'Ram'}>Ram</option>
                                <option value={'Rivian'}>Rivian</option>
                                <option value={'Saab'}>Saab</option>
                                <option value={'Saturn'}>Saturn</option>
                                <option value={'Scion'}>Scion</option>
                                <option value={'Smart'}>Smart</option>
                                <option value={'Subaru'}>Subaru</option>
                                <option value={'Suzuki'}>Suzuki</option>
                                <option value={'Tesla'}>Tesla</option>
                                <option value={'Toyota'}>Toyota</option>
                                <option value={'Volkswagen'}>Volkswagen</option>
                                <option value={'Volvo'}>Volvo</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="model">Model:*</label>
                            <input id="model" type="text" onChange={e => setModel(e.target.value)} value={model} />
                        </div>
                        <div>
                            <label htmlFor="city">City:*</label>
                            <input id="city" type="text" onChange={e => setCity(e.target.value)} value={city} />
                        </div>
                        <div>
                            <label htmlFor="state">State:*</label>
                            <input id="state" type="text" onChange={e => setState(e.target.value)} value={state} />
                        </div>
                        <div>
                            <label htmlFor="country">Country:*</label>
                            <input id="country" type="text" onChange={e => setCountry(e.target.value)} value={country} />
                        </div>
                        <div>
                            <label htmlFor="description">Description:*</label>
                            <textarea id="description" className="car-textarea" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="price">Price:*</label>
                            <input id="price" type="number" step=".01" onChange={e => setPrice(e.target.value)} value={price} />
                        </div>
                        <div>
                            <label htmlFor="image1">Image1 URL:*</label>
                            <input id="image1" type="url" onChange={e => setImage1(e.target.value)} value={image1} />
                        </div>
                        <div>
                            <label htmlFor="image2">Image2 URL:*</label>
                            <input id="image2" type="url" onChange={e => setImage2(e.target.value)} value={image2} />
                        </div>
                        <div>
                            <label htmlFor="image3">Image3 URL:*</label>
                            <input id="image3" type="url" onChange={e => setImage3(e.target.value)} value={image3} />
                        </div>
                        <div>
                            <label htmlFor="image4">Image4 URL:*</label>
                            <input id="image4" type="url" onChange={e => setImage4(e.target.value)} value={image4} />
                        </div>
                        <div>
                            <label htmlFor="image5">Image5 URL:*</label>
                            <input id="image5" type="url" onChange={e => setImage5(e.target.value)} value={image5} />
                        </div>
                        <span>* This field is required</span>
                        <div>
                            <button className="single-btn-airbnb-color">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CreateCar;
