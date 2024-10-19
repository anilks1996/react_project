import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getActiveUserId, getLoggedInUser } from "../auth/auth_slice/loginUserSlice";

const ProtectedRoute = (props) => {
    const {activeUserId,loggedInUser,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const checkUserToken = () => {
    //     const userToken = localStorage.getItem('user-token');
    //     if (!userToken || userToken === 'undefined') {
    //         setIsLoggedIn(false);
    //         return navigate('/auth/login');
    //     }
    //     setIsLoggedIn(true);
    // }

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!activeUserId || activeUserId === 'undefined') {
                setIsLoggedIn(false);
                return navigate('/auth/login');
        }else{
            setIsLoggedIn(true);
        }       
    }

    useEffect(() => {
        dispatch(getActiveUserId());
        dispatch(getLoggedInUser());
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;