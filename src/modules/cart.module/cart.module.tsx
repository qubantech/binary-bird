import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Text} from "@mantine/core";

const CartModule = () => {

    return(
        <>
            <AppHeader title={<Text size={'xl'}>Корзина</Text>}/>
        cart</>
    )
}
export default {
    routeProps: {
        path: 'cart',
        exact: true,
        index: false,
        element: <CartModule/>,
    },
    name: 'CartModule',
};

