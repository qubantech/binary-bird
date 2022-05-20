import React, {useEffect} from "react";
import {LoadingOverlay} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../store/createstore";
import {useUser} from "./app.services/app.user.service";
import {useAuthState, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "./app.configs";
import {setUUID} from "../store/user.store/user-action-creators";
import {useNavigate} from "react-router-dom";

const Redirect = () => {
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [ user, loading, error ] = useAuthState(auth);
    useEffect(()=> {
        console.log(user)
        if (user){
            console.log(user.uid)
            dispatch(setUUID(user.uid))
            navigate('/auth')
        }
    },[user])

    return(
        <>
            <LoadingOverlay visible={true}/>
        </>

    )
}
export default {
    routeProps: {
        path: 'redirect',
        exact: true,
        index: false,
        element: <Redirect/>,
    },
    name: 'Redirect',
};