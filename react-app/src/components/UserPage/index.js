import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserBookings } from "../../store/bookings";


const UserPage = ({sessionUser}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserBookings(sessionUser.id))
    }, [dispatch, sessionUser])


    return (
        <div>
            <h1>User Profile Page</h1>
            <div>
                <h3>My Bookings</h3>
            </div>
        </div>
    )
}

export default UserPage;
