import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app.configs";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Input, LoadingOverlay, Space, Title} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer, useAppDispatch, useAppSelector} from "../../../store/createstore";
import {loginUser, setLoading, setUser, setUUID} from "../../../store/user.store/user-action-creators";
import {userState} from "../../../store/user.store/user-reducer";
import {useUser} from "../../app.services/app.user.service";

export const LoginLayout = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    let navigate = useNavigate();
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const login = () => {
        signInWithEmailAndPassword(email, password)
            .then((resp) =>{
                // console.log(user)
                // if (user) {
                //     dispatch(setUUID(user?.user.uid))
                // }
                navigate('/redirect')
            })

        //dispatch(loginUser(email, password))
    };

    // useEffect(() => {
    //     if (user){
    //         dispatch(setUUID(user?.user.uid))
    //         navigate('/redirect')
    //     }
    // },[user])

    return (
        <Container>
            {userStatus.loading && <LoadingOverlay visible={true}/>}
            <Input
                style={{backgroundColor :"#EEF6FF", borderRadius:10, padding:5}}
                variant={"unstyled"}
                placeholder="Email..."
                onChange={(event:any) => {
                    setEmail(event.target.value);
                }}
            />
            <Space h={"sm"}/>
            <Input
                style={{backgroundColor :"#EEF6FF", borderRadius:10, padding:5}}
                variant={"unstyled"}
                placeholder="Password..."
                onChange={(event:any) => {
                    setPassword(event.target.value);
                }}
            />
            <Space h={"xl"}/>
            <Button size={"lg"} fullWidth onClick={login}>Вход</Button>
            {error?.message}
        </Container>
    );
}
