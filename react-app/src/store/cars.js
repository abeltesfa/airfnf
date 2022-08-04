const LOAD_CARS = 'cars/LOAD_CARS';
const ADD_CARS = 'cars/ADD_CARS';

const actionLoadPosts = (posts) => ({
    type: LOAD_CARS,
    posts
});

const actionAddPost = (post) => ({
    type:ADD_CARS,
    post
})

export const getAllCars = () => async(dispatch) => {
    const response = await fetch(`/api/cars/`);

    if(response.ok){
        const cars = await response.json();
        dispatch(actionLoadPosts(cars));
        return cars;
    }
}

export const addCars = (carForm) => async(dispatch) => {
    const response = await fetch('/api/cars/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            carForm
        })
    })
    if(response.ok) {
        const carPost = await response.json();
        dispatch(actionAddPost(carPost));
        return carPost;
    }
}

const carsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CARS:
            const newState = {};
            action.posts.cars.forEach(car => {
                newState[car.id] = car;
            });
            return newState;

        case ADD_CARS:
            const newState2 = {...state};
            newState2[action.post.id] = action.post;
            return newState2;

        default:
            return state;
    }
}

export default carsReducer;
