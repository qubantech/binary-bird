import React, { useEffect } from 'react';

import { auth } from './app.configs';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader, ServerError } from './app.components';
import { AuthLayout } from './app.layouts';

import {Link, useNavigate} from 'react-router-dom';
import { CommonModules } from '../modules';
import { useWatchedObject } from "./app.services/app.realtimedb.service";
import { RTDB } from "./app.resources/app.resouces.realtimedb";
import {useUser} from "./app.services/app.user.service";
import {useAppDispatch, useAppSelector} from "../store/createstore";
import {setUser} from "../store/user.store/user-action-creators";
import {Title} from "@mantine/core";


const App = () => {

    const [ user, loading, error ] = useAuthState(auth);
    let navigate = useNavigate();
    const userInfo = useUser(user?.uid || '0')
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const { watchedObject, setWatchedObject } = useWatchedObject<String>(RTDB.SAMPLE_PATH);

    useEffect(() => {
        // setWatchedObject('Этот текст отпавляется в базу и возвращается обратно');
        // console.log(loading)
        // console.log(userInfo.watchedObject)
        // if (userInfo.watchedObject){
        //     dispatch(setUser(userInfo))
        //         if (userInfo?.watchedObject?.role === 'USER') {
        //         navigate('/profile')
        //     }
        // }
        // console.log(user, loading, error)
        // if (user) {
        //     navigate("/profile");
        // }
    }, [user])

    return (
        <>
            {/*<div>*/}
            {/*    Realtime db demo*/}
            {/*    <p>*/}
            {/*        {watchedObject && <strong>Объект в базе: {watchedObject}</strong>}*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*<header>*/}
            {/*    <ul>*/}
            {/*        {*/}
            {/*            CommonModules.map(module =>*/}
            {/*                <li key={module.name}>*/}
            {/*                    <Link to={module.routeProps.path}>*/}
            {/*                        {module.name}*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </ul>*/}
            {/*</header>*/}
            <Title mx={15} my={20} order={2}>Авторизация</Title>
            {
                error
                && <ServerError/>
                || loading
                && <Loader/>
                || <AuthLayout user={user}/>
            }
        </>
    );

}

export default {
    routeProps: {
        path: '/',
        exact: true,
        index: false,
        element: <App/>
    },
    name: 'Main'
}