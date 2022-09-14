import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchBar.css"

const SearchBar = () => {
    const [cars, setCars] = useState('');
    const [carData, setCarData] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const fetchCars = () => {
        fetch('/api/cars/')
            .then(response => response.json())
            .then(data => setCars(data))
    }

    useEffect(() => {
        fetchCars()
    }, []);

    console.log('cardata........', carData)

    const handleChange = (searchWord) => {
        console.log(cars.cars)
        if (searchWord) {
            const searchCarResults = cars.cars.filter(car => car.make.toLowerCase().startsWith(searchWord.toLowerCase()))
            console.log(searchCarResults)

            setCarData(searchCarResults);
            setDropdown(true);
            setSearchInput(searchWord)
        } else {
            setSearchInput(searchWord)
            setDropdown(false)
        }
    }


    const clickResult = () => {
        setDropdown(false);
        setSearchInput('');
    }

    return (
        <div className="search-bar">
            {dropdown &&
                <div className="search-dropdown-cancel" onClick={() => clickResult()}></div>
            }
            <div className="search-field">
                <input
                    placeholder="Search"
                    onChange={(e) => handleChange(e.target.value)}
                    value={searchInput}
                >
                </input>
            </div>
            <div className={dropdown ? "search-results" : "search-none"}>
                {
                    dropdown && (carData.length) ? (
                        <>
                            {carData &&
                                carData.map(car => (
                                    <div key={car.id} className="search-user">
                                        <Link onClick={() => clickResult()} to={`/cars/${car.id}`} >
                                            <div className="search-car-info">
                                                <div className="search-carmake">
                                                    {car.make}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </>
                    )
                        :
                        (<div className={dropdown ? "no-show" : "no-hide"} id="no-results">No results found.</div>)
                }

            </div>

        </div>
    )
}
export default SearchBar;
