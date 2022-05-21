import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Affix, Button, Container, LoadingOverlay, Text} from "@mantine/core";
import {ChevronRight} from "tabler-icons-react";
import {Good, Order, OrderCreateDto, OrderedGood, OrderStatus, Seller} from "../../app.shared/app.models/models";
import {useSeller} from "../../app.shared/app.services/app.sellers.service";
import GoodCard from "../../app.shared/app.components/good-card";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import {setGoods} from "../../store/cart.store/cart-action-creators";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useOrderedGoodList} from "../../app.shared/app.services/app.ordered-good.service";
import {MyDrawer} from "../../app.shared/app.layouts/app.draver/myDraver";
import {DrawerScannerModule} from "./drawer.scanner.module";
import {DrawerCompleteModule} from "./drawer.complete.module";
import {transactionsService} from "../../app.shared/app.services/app.transactions.service";
import {v4 as uuidv4} from "uuid";

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
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isComplete, setComplete] = useState<boolean>(false)
    const [order, setOrder] = useState<OrderCreateDto>()
    const [uid, setUid] = useState<string>("")

    const cartStatus = useAppSelector(state => state.cart)
    const userStatus = useAppSelector(state => state.user)
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

    const getQR = () => {
        setOpen(true)
    }

    async function addOrder (s:string) {
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
        console.log(userStatus.uuid)
        const time = new Date()
        setTimeout(()=>{
            console.log(orderedGoods)
            const uuid = orderList.do.place({
                buyerUid: s,
                sellerUid: userStatus.uuid,
                goods: orderedGoods,
                totalPrice: Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                    // @ts-ignore
                    previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
                ),
                createdAt: time.toLocaleString(),
                closedAt:  new Date().toLocaleString()})
            console.log(uuid)
            setOrder({
                buyerUid: s,
                sellerUid: userStatus.uuid,
                goods: orderedGoods,
                totalPrice: Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                    // @ts-ignore
                    previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
                ),
                createdAt: time.toLocaleString(),
                closedAt:  new Date().toLocaleString()})
            console.log({
                buyerUid: s,
                sellerUid: userStatus.uuid,
                goods: orderedGoods,
                totalPrice: Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex   ) =>
                    // @ts-ignore
                    previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
                ),
                createdAt: time.toLocaleString(),
                closedAt:  new Date().toLocaleString()})
            const q = uuidv4()
            transactionsService.doTransaction(s, userStatus.uuid, q, Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                // @ts-ignore
                previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
            ) )
            setComplete(true)
                //
        }, 1500)

    }

    const setUUid = (s:string) => {
        setUid(s)
        addOrder(s)
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
                    <DrawerScannerModule sellerName={seller.legalEntityName} isOpen={isOpen} setOpen={setOpen} setUid={setUUid}/>
                    <DrawerCompleteModule isOpen={isComplete} setOpen={setComplete} sellerName={seller.legalEntityName} order={order} />
                    <Affix position={{bottom:85, left:0}} sx={{width:"100%"}}>
                        <Button onClick={() => getQR()} size={'md'} px={15}
                                rightIcon={<ChevronRight/>} fullWidth>
                            Продолжить {
                            //@ts-ignore
                            Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                                // @ts-ignore
                                previousValue + Number(cartStatus.amount[currentIndex]) * currentValue.price, 0
                            )
                           }
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