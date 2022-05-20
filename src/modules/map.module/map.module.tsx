import React from 'react';

const Map = () => {

    return (
        <>
            map module
        </>
    )
};

export default {
    routeProps: {
        path: 'map',
        exact: true,
        index: false,
        element: <Map/>,
    },
    name: 'MapModule',
};