import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Text} from "@mantine/core";

const WeatherModule = () => {

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Погодные условия</Text>}/>
            <Container mt={65}>

            </Container>
        </>
    )
}

export default {
    routeProps: {
        path: 'weather',
        exact: true,
        index: false,
        element: <WeatherModule/>,
    },
    name: 'Weather',
};