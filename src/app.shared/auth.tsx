import React, {useEffect} from "react";
import {LoadingOverlay} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../store/createstore";
import {useUser} from "./app.services/app.user.service";
import {setUser} from "../store/user.store/user-action-creators";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const userInfo = useUser(userStatus.uuid)
    const navigate = useNavigate()

    useEffect(()=> {
        console.log(userStatus)
        console.log(userInfo)
        if (userInfo) {
            console.log(userInfo.watchedObject?.role)
            dispatch(setUser(userInfo.watchedObject))
            if (userInfo.watchedObject?.role === 'USER') navigate('/profile')
        }


    },[userInfo])

    return(
        <>
            <LoadingOverlay visible={true}/>
        </>
    )
}

export default {
    routeProps: {
        path: 'auth',
        exact: true,
        index: false,
        element: <AuthPage/>,
    },
    name: 'Auth',
};