import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteCar, getAllCars } from "../../store/cars";


const CarDetails = () => {
    const dispatch = useDispatch();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const specificCar = cars[pCarId.carId];

    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])

    const onDelete = async() => {
        await dispatch(deleteCar(pCarId.carId))
    }

    return (
        specificCar && specificCar.images ?
            <div>
                <h1>Car Detail</h1>
                <div>
                    <button onClick={onDelete}>Delete Car</button>
                </div>
                <div>
                    {specificCar.images.map(pic => (
                        <div key={pic.id}>
                            <img src={pic.url} alt=''></img>
                        </div>
                    ))}
                </div>
                <p>{specificCar.carYear} {specificCar.make} {specificCar.model}</p>
                <p>{specificCar.description}</p>
                <p>Location: {specificCar.city} {specificCar.state} {specificCar.country}</p>
                <p>Price: ${specificCar.price}</p>
                <NavLink to={`/cars/${specificCar.id}/edit`}>
                    Car Edit
                </NavLink>
            </div>
            : null
    )
}

export default CarDetails;
