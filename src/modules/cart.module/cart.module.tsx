import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Button, Container, Text} from "@mantine/core";
import CardCart from "./card-cart";
import { useSelector } from "react-redux";

const CartModule = () => {

    // @ts-ignore
    const data = useSelector(state => state.cart)

    return(
        <>
            <AppHeader title={<Text size={'xl'}>Корзина</Text>}/>
            <Container mt={65}>
                {
                    data.goods.map((good: any) => <CardCart good={good} index={good.uuid}/>)
                }
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

