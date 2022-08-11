import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCars } from "../../store/cars";
// import { getAllImages } from "../../store/images";

const HomePage = () => {
    const dispatch = useDispatch();
    const cars = useSelector(state=> state.cars)

    useEffect(()=> {
        dispatch(getAllCars());
    },[dispatch])

    return (
        cars ?
        <div>
            <h1>Home Page</h1>
            {Object.values(cars).map((car) => (
                <div key={car?.id}>
                    <NavLink to={`/cars/${car.id}`}>
                    <p>{car.carYear} {car.make} {car.model}</p>
                    <img src={car.images[0]?.url} onError={(e)=>{e.target.onError=null; e.target.src='https://cdn-icons-png.flaticon.com/512/2137/2137884.png'}} alt=""></img>
                    </NavLink>
                </div>
            ))}
        </div>
        : null
    )
}

export default HomePage;
