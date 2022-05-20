import React from 'react';

const Profile = () => {

    return (
        <>
            profile module
        </>
    )
};

export default {
    routeProps: {
        path: 'profile',
        exact: true,
        index: false,
        element: <Profile/>,
    },
    name: 'Profile',
};