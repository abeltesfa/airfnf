import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCars } from "../../store/cars";
import CarEdit from "../CarEdit";

const CarDetails = () => {
    const dispatch = useDispatch();
    const pCarId = useParams();
    const cars = useSelector(state => state.cars);
    const specificCar = cars[pCarId.carId];

    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])

    return (
        specificCar && specificCar.images ?
            <div>
                <h1>Car Detail</h1>
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
