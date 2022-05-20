import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../app.shared/app.configs";

const QRHandler = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div>
            work with qr
        </div>
    );
};

export default {
    routeProps: {
        path: '/qrcode/:number',
        exact: true,
        index: false,
        element: <QRHandler/>,
    },
    name: 'Camera',
};