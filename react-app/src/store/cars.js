const LOAD_CARS = 'cars/LOAD_CARS';
const ADD_CARS = 'cars/ADD_CARS';
const ADD_IMAGES = 'cars/ADD_IMAGES';

const actionLoadPosts = (posts) => ({
    type: LOAD_CARS,
    posts
});

const actionAddPost = (post) => ({
    type:ADD_CARS,
    post
})

const actionAddImages = (images) => ({
    type: ADD_IMAGES,
    images
})

export const getAllCars = () => async(dispatch) => {
    const response = await fetch(`/api/cars/`);

    if(response.ok){
        const cars = await response.json();
        dispatch(actionLoadPosts(cars));
        return cars;
    }
}

export const addCars = (carYear,
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
    image5) => async(dispatch) => {
    const response = await fetch('/api/cars/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {carYear,
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
            image5}
        )
    })

    if(response.ok) {
        const carPost = await response.json();
        dispatch(actionAddPost(carPost));
        return carPost;
    }
}

export const addImages = (imageForm) => async(dispatch) => {
    const response = await fetch ('/api/cars/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageForm
        })
    })
    if(response.ok) {
        const imagePost = await response.json();
        dispatch(actionAddImages(imagePost));
        return imagePost;
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
            newState2[action.post.id].images = {}
            return newState2;

        default:
            return state;
    }
}

export default carsReducer;
