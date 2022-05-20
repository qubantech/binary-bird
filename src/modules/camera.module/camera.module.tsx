import React from 'react';
import Scanner from "./html5qrcomponents/scanner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../app.shared/app.configs";

const TAB_TYPE = {
    CAMERA: 'camera',
    SCANNER: 'scanner'
}


const Camera = () => {
    const [ user, loading, error ] = useAuthState(auth);

    return (
        <>
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