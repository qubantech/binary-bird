import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Button, Container, Text} from "@mantine/core";
import CardCart from "./card-cart";

const CartModule = () => {

    return(
        <>
            <AppHeader title={<Text size={'xl'}>Корзина</Text>}/>
            <Container mt={55}>
                <CardCart good={{
                    uuid: 'string',
                    name: 'Шаурма',
                    description: 'Шаурма вкусная',
                    imageUrl: 'string',
                    price: 100,
                }}/>
                <CardCart good={{
                    uuid: 'string',
                    name: 'Шаурма',
                    description: 'Шаурма вкусная',
                    imageUrl: 'string',
                    price: 100,
                }}/>
                <Button size={'lg'} fullWidth><Text size={'lg'}>Оформить заказ</Text></Button>
            </Container>
        </>
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

