import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Title, Text, Group, ActionIcon, Paper, Center, Loader} from "@mantine/core";
import {AlertCircle, Check, ChevronRight, Pencil, Replace, Rotate2, Wallet} from "tabler-icons-react";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useAppSelector} from "../../store/createstore";
import {useSellersList} from "../../app.shared/app.services/app.sellers.service";
import {MyDrawer} from "../../app.shared/app.layouts/app.draver/myDraver";
import {Order} from "../../app.shared/app.models/models";
import {ActiveDrawer} from "../../app.shared/app.layouts/app.draver/activeDrawer";

const SellerOrdersModule = () => {
    const orders = useOrdersList()
    const sellers = useSellersList()
    const userStatus = useAppSelector(state => state.user)
    const [order, setOrder] = useState<Order>()
    const [isOpen, setOpen] = useState(false)
    const [orderActive, setOrderActive] = useState<Order>()
    const [isOpenActive, setOpenActive] = useState(false)

    useEffect(()=> {console.log(orders)},[orders])

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Заказы продавца</Text>}/>
             <Container mt={65}>
                 <Title order={3} py={10}>
                     Активные заказы
                 </Title>
                 {orderActive && <ActiveDrawer order={orderActive} isOpen={isOpenActive} setOpen={setOpenActive}/>}
                 <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                     <Group position={'apart'} onClick={()=> {
                         setOpenActive(true)
                         //@ts-ignore
                         if(orders.watchedObject) setOrderActive(orders.watchedObject[0])
                     }}>
                         <Group spacing={10}>
                             <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>
                                 <Rotate2/>
                             </ActionIcon>
                             <Group direction={'column'} spacing={0}>
                                 <Text>Иван Иванов</Text>
                                 <Text size={'sm'} color={'gray'}>10 минут назад</Text>
                                 <Text size={'sm'}>60 жемчужинок</Text>
                             </Group>
                         </Group>
                         <Group spacing={5}>
                             <ActionIcon size={'xl'}>
                                 <ChevronRight size={'lg'}/>
                             </ActionIcon>
                         </Group>
                     </Group>
                 </Paper>

                 <Title order={3} py={10}>
                     Завершенные заказы
                 </Title>

                 {order && <MyDrawer order={order} isOpen={isOpen} setOpen={setOpen}/>}
                 {orders && orders.watchedObject && orders.watchedObject.reverse().filter((el) => el?.sellerUid === userStatus.uuid).map((el) => {
                     return (
                     <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                         <Group position={'apart'} onClick={() => {
                             if (el) setOrder(el)
                             setOpen(true)
                         }}>
                             <Group spacing={10}>
                                 {el?.status === 'PLACED' &&
                                     <ActionIcon radius={'xl'} size={'xl'} color={'orange'} variant={'filled'}>
                                         <Rotate2/>
                                     </ActionIcon>
                                 }
                                 {el?.status === 'FINISHED' &&
                                         <ActionIcon radius={'xl'} size={'xl'} color={'green'} variant={'filled'}>
                                             <Check/>
                                         </ActionIcon>
                                 }
                                 <Group direction={'column'} spacing={1}>
                                     <Text>{el?.buyerUid}</Text>
                                     <Text size={'sm'} color={'gray'}>{el?.totalPrice} жемчужин</Text>
                                     <Text size={'xs'} color={'gray'}>{el?.closedAt}</Text>
                                 </Group>
                             </Group>
                             <Group spacing={5}>
                                 {el?.status === 'PLACED' &&
                                     <ActionIcon size={'xl'} color={'orange'} variant={'filled'}>
                                         <Replace/>
                                     </ActionIcon>
                                 }
                                 {el?.status === 'FINISHED' &&
                                     <Group spacing={5}>
                                         <ActionIcon size={'xl'} color={'red'} variant={'filled'}>
                                             <AlertCircle/>
                                         </ActionIcon>
                                     </Group>
                                 }
                             </Group>
                         </Group>
                     </Paper>
                     )

                 }) || <Center>
                     <Loader/>
                 </Center>}


             </Container>
        </>
    )
}

export default {
    routeProps: {
        path: 'seller_orders',
        exact: true,
        index: false,
        element: <SellerOrdersModule/>,
    },
    name: 'SellerOrders',
};