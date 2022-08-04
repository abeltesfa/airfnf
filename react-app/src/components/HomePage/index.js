import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/cars";

const HomePage = () => {
    const dispatch = useDispatch();
    const cars = useSelector(state=> state.cars)

    useEffect(()=> {
        dispatch(getAllCars())
    },[dispatch])

    return (
        <div>
            <h1>Home Page</h1>
            {Object.values(cars).map((car) => (
                <div key={car?.id}>
                    <p>{car.carYear} {car.make} {car.model}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage;
