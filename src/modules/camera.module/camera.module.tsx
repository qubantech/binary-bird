import React from 'react';
import Scanner from "./html5qrcomponents/scanner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../app.shared/app.configs";
import {Title, Text} from "@mantine/core";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";

const TAB_TYPE = {
    CAMERA: 'camera',
    SCANNER: 'scanner'
}


const Camera = () => {
    const [ user, loading, error ] = useAuthState(auth);

    return (
        <>
            <AppHeader title={<Text size={'lg'}>QR-код</Text>}/>
            <Scanner/>
        </>
    )
};

export default {
    routeProps: {
        path: 'scanner',
        exact: true,
        index: false,
        element: <Camera/>,
    },
    name: 'Camera',
};