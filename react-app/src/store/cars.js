const LOAD_CARS = 'cars/LOAD_CARS';

const actionLoadPosts = (posts) => ({
    type: LOAD_CARS,
    posts
});

export const getAllCars = () => async(dispatch) => {
    const response = await fetch(`/api/cars`);

    if(response.ok){
        const cars = await response.json();
        dispatch(actionLoadPosts(cars));
        return cars;
    }
}

const carsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CARS:
            const newState = {};
            action.posts.cars.forEach(car => {
                newState[car.id] = car;
            });
            console.log(action)
            return newState;
        default:
            return state;
    }
}

export default carsReducer;
