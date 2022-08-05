const LOAD_IMAGES = 'cars/LOAD_IMAGES';

const actionLoadImages = (images) => ({
    type: LOAD_IMAGES,
    images
})

export const getAllImages = () => async (dispatch) => {
    const response = await fetch('/api/cars/images');

    if (response.ok) {
        const images = await response.json();
        dispatch(actionLoadImages(images));
        return images;
    }
}

export const getAllImagesCar = (carId) => async (dispatch) => {
    const response = await fetch(`/api/cars/${carId}/images`);

    if(response.ok) {
        const images = await response.json();
        dispatch(actionLoadImages(images));
        return images;
    }
}

const imagesReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_IMAGES:
        const newState = {};
        action.images.images.forEach(image => {
            newState[image.id] = image;
        });
        return newState;

        default:
            return state;
    }
}

export default imagesReducer;
