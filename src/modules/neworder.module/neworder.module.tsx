import React, { memo, useEffect, useState } from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import { ActionIcon, Affix, Button, Container, Grid, Group, Image, LoadingOverlay, Text } from "@mantine/core";
import { ChevronRight, Minus, Plus } from "tabler-icons-react";
import {Good, Order, OrderCreateDto, OrderedGood, OrderStatus, Seller} from "../../app.shared/app.models/models";
import {useSeller} from "../../app.shared/app.services/app.sellers.service";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import { setAmount, setGoods } from "../../store/cart.store/cart-action-creators";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useOrderedGoodList} from "../../app.shared/app.services/app.ordered-good.service";
import {MyDrawer} from "../../app.shared/app.layouts/app.draver/myDraver";
import {DrawerScannerModule} from "./drawer.scanner.module";
import {DrawerCompleteModule} from "./drawer.complete.module";
import {transactionsService} from "../../app.shared/app.services/app.transactions.service";
import {v4 as uuidv4} from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

const GoodCard = memo((props:{good:Good, index:number}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const data = useSelector(state => state.cart)

    const [addedToCart, setAddedToCart] = useState(data.amount[props.good.uuid] || 0)

    return (
        <Group position={'apart'} mt={'20px'} sx={{
            backgroundColor: '#F8F9FA',
            padding: '5px 15px',
            border: '1px solid #EAEBEF',
            borderRadius: '6px',
            width: "100%"
        }}>
            <Group>
                <Grid pt={10}>
                    <Grid.Col span={5}>
                        <Image
                            radius='sm'
                            src={props.good.imageUrl}
                            alt='no image here'
                            fit='contain'
                            width={'100%'}
                        />
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Group direction={'column'} spacing={0}>
                            <Text size={'md'} weight={700}> {props.good.name[0].toUpperCase() + props.good.name.slice(1)} </Text>
                            <Text size={'md'}> {props.good.description[0].toUpperCase()+ props.good.description.slice(1)} </Text>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Group>
            {
                addedToCart > 0 ?
                    <Group grow sx={{width: "100%"}} position={'left'}>
                        <Group position={'center'}>
                            <ActionIcon onClick={() =>
                            {
                                dispatch(setAmount(props.good.uuid,addedToCart - 1))
                                setAddedToCart(addedToCart - 1)
                            }
                            } size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Minus/>
                            </ActionIcon>
                            <Text weight={700} align={'center'}>{addedToCart}</Text>
                            <ActionIcon onClick={() => {
                                dispatch(setAmount(props.good.uuid,addedToCart+1))
                                setAddedToCart(addedToCart + 1)
                            }} size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Plus/>
                            </ActionIcon>
                        </Group>
                        <Group grow position={'center'}>
                            <Button size={'md'} sx={{width: "100%"}} onClick={() => {
                                navigate('/cart')
                            }}> <Group
                                spacing={0} align={'center'} direction={'column'}>
                                <Text size={"xs"}>В корзине</Text>
                                {props.good.price * addedToCart}
                            </Group></Button>
                        </Group>
                    </Group>
                    :
                    <Button fullWidth size={'md'} variant={'outline'} onClick={() => {
                        setAddedToCart(1)
                        dispatch(setAmount(props.good.uuid,1))
                    }}>
                        <Group spacing={0} align={'center'} direction={'column'}>
                            <Text size={"xs"}>Добавить в корзину</Text>
                            {props.good.price}
                        </Group>
                    </Button>
            }

        </Group>
    );
});

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
            info.watchedObject.goods.forEach(good => dispatch(setAmount(good.uuid, 0)))
        }
    },[info.watchedObject])

    const getQR = () => {
        setOpen(true)
    }

    async function addOrder (s:string) {

        // @ts-ignore
        const orders:Good[] = cartStatus.goods.filter((el, index)=> cartStatus.amount[el.uuid]!==0)

        const orderedGoods: OrderedGood[] = []
        cartStatus.goods.map((el, index)=> {
            orderedGoods.push({
                good: el,
                // @ts-ignore
                quantity: cartStatus.amount[el.uuid]
            })
            orderGoodList.addOrderedGood({
                good: el,
                // @ts-ignore
                quantity: cartStatus.amount[el.uuid]
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
                    previousValue + Number(cartStatus.amount[currentValue.uuid]) * currentValue.price, 0
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
                    previousValue + Number(cartStatus.amount[currentValue.uuid]) * currentValue.price, 0
                ),
                createdAt: time.toLocaleString(),
                closedAt:  new Date().toLocaleString()})
            console.log({
                buyerUid: s,
                sellerUid: userStatus.uuid,
                goods: orderedGoods,
                totalPrice: Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex   ) =>
                    // @ts-ignore
                    previousValue + Number(cartStatus.amount[currentValue.uuid]) * currentValue.price, 0
                ),
                createdAt: time.toLocaleString(),
                closedAt:  new Date().toLocaleString()})
            const q = uuidv4()
            transactionsService.doTransaction(s, userStatus.uuid, q, Object.values(cartStatus.goods).reduce((previousValue, currentValue, currentIndex) =>
                // @ts-ignore
                previousValue + Number(cartStatus.amount[currentValue.uuid]) * currentValue.price, 0
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
                <Container mt={65} mb={80}>
                    {seller.goods.map((el, index) => {
                        return(
                            <GoodCard index={index} good={el}/>
                        )
                    }
                    )}
                    <DrawerScannerModule sellerName={seller.legalEntityName} isOpen={isOpen} setOpen={setOpen} setUid={setUUid}/>
                    <DrawerCompleteModule isOpen={isComplete} setOpen={setComplete} sellerName={seller.legalEntityName} order={order} />
                    <Group pt={15} position={'apart'} px={7}>
                        <Text size={'lg'}>Итого</Text>
                        <Text size={'lg'} weight={700}>{
                        //@ts-ignore
                        Object.values(cartStatus.goods)
                            .reduce((previousValue, currentValue, currentIndex) =>
                            // @ts-ignore
                                previousValue + cartStatus.amount[currentValue.uuid] * currentValue.price, 0
                            )
                        }
                        </Text>
                    </Group>
                        <Button my={20} onClick={() => getQR()} size={'md'} px={15}
                                rightIcon={<ChevronRight/>} fullWidth>
                            Продолжить
                        </Button>
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