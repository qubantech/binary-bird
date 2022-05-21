import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Affix, Button, Container, LoadingOverlay, Text} from "@mantine/core";
import {ChevronRight} from "tabler-icons-react";
import {Good, Order, OrderedGood, OrderStatus, Seller} from "../../app.shared/app.models/models";
import {useSeller} from "../../app.shared/app.services/app.sellers.service";
import GoodCard from "../../app.shared/app.components/good-card";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import {setGoods} from "../../store/cart.store/cart-action-creators";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useOrderedGoodList} from "../../app.shared/app.services/app.ordered-good.service";

export const initStateSeller:Seller = {
    uuid: "",
    legalEntityName: "",
    phone: "",
    workTime: "",
    gps: {
        latitude: 1,
        longitude: 1,
    },
    dynamic: false,
    cashier: {
        firstname: "",
        lastname: "",
        photoUrl: "",
    },
    tags: [],
    goods: [],
    inn: "",
    photosUrl: [],
}

const NeworderModule = () => {

    const [seller, setSeller] = useState<Seller>(initStateSeller)
    const info = useSeller('0')

    const cartStatus = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const orderList = useOrdersList()
    const orderGoodList = useOrderedGoodList()

    useEffect(() => {
        console.log(info)
        if (info.watchedObject) {
            setSeller(info.watchedObject)
            dispatch(setGoods(info.watchedObject.goods))
        }
    },[info.watchedObject])

    const addOrder = () => {
        const orders:Good[] = cartStatus.goods.filter((el, index)=> cartStatus.amount[index]!==0)
        const orderedGoods: OrderedGood[] = []
        cartStatus.goods.map((el, index)=> {
            orderedGoods.push({
                good: el,
                quantity: cartStatus.amount[index]
            })
            orderGoodList.addOrderedGood({
                good: el,
                quantity: cartStatus.amount[index]
            })
        })
        console.log(orderedGoods)
        orderList.do.place({
            buyerUid: 's',
            sellerUid: cartStatus.buyerUid,
            goods: orderedGoods,
            totalPrice: Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                // @ts-ignore
                previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
            ),
            createdAt: "22-05-2022 10:48",
            closedAt: '22-05-2022 13:45'})
    }

    return(
        <>
            <AppHeader title={<Text size={'lg'}>Новый заказ</Text>}></AppHeader>
            {seller !== initStateSeller &&
                <Container mt={65} mb={130}>
                    {seller.goods.map((el, index) => {
                        return(
                            <GoodCard index={index} good={el}/>
                        )
                    }
                    )}
                    <Affix  position={{bottom:85, left:0}} sx={{width:"100%"}}>
                        <Button onClick={() => addOrder()} size={'md'} px={15}
                                rightIcon={<ChevronRight/>} fullWidth>
                            Продолжить {
                            //@ts-ignore
                            Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                                // @ts-ignore
                                previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
                            )
                           }р.
                        </Button>
                    </Affix>
                </Container>
            || <LoadingOverlay visible={true}/>}
        </>
    )
}

export default {
    routeProps: {
        path: 'neworder',
        exact: true,
        index: false,
        element: <NeworderModule/>,
    },
    name: 'NewOrder',
};