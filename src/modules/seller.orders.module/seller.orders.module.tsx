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
                 {/*<Title order={3} py={10}>*/}
                 {/*    Активные заказы*/}
                 {/*</Title>*/}
                 <Group spacing={ 10 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 -16px', padding: '0 20px 10px 20px'}} >
                     <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Активные заказы</Text>
                     {orderActive && <ActiveDrawer order={orderActive} isOpen={isOpenActive} setOpen={setOpenActive}/>}
                     <Paper  shadow={'md'} p={'md'} sx={{backgroundColor: "#ffffff", width: '100%'}}>
                         <Group position={'apart'} onClick={()=> {
                             setOpenActive(true)
                             //@ts-ignore
                             if(orders.watchedObject) setOrderActive(orders.watchedObject[0])
                         }}>
                             <Group spacing={10}>
                                 <ActionIcon size={'xl'} color={'orange'} variant={'light'} radius={'xl'}>
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
                 </Group>



                 <Group spacing={ 10 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 -16px', padding: '0 20px 10px 20px'}} >
                     <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Завершенные заказы</Text>
                     {order && <MyDrawer order={order} isOpen={isOpen} setOpen={setOpen}/>}
                     {orders && orders.watchedObject && orders.watchedObject.reverse().filter((el) => el?.sellerUid === userStatus.uuid).map((el) => {
                         return (
                             <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#ffffff", width: '100%'}}>
                                 <Group position={'apart'} onClick={() => {
                                     if (el) setOrder(el)
                                     setOpen(true)
                                 }}>
                                     <Group spacing={10}>
                                         {el?.status === 'PLACED' &&
                                         <ActionIcon radius={'xl'} size={'xl'} color={'orange'} variant={'light'}>
                                             <Rotate2/>
                                         </ActionIcon>
                                         }
                                         {el?.status === 'FINISHED' &&
                                         <ActionIcon radius={'xl'} size={'xl'} color={'green'} variant={'light'}>
                                             <Check/>
                                         </ActionIcon>
                                         }
                                         <Group direction={'column'} spacing={1}>
                                             <Text>Иван Иванов</Text>
                                             <Text size={'sm'} color={'gray'}>{el?.totalPrice} жемчужин</Text>
                                             <Text size={'xs'} color={'gray'}>{el?.closedAt}</Text>
                                         </Group>
                                     </Group>
                                     <Group spacing={5}>
                                         {el?.status === 'PLACED' &&
                                         <ActionIcon size={'xl'} color={'orange'} variant={'outline'}>
                                             <Replace/>
                                         </ActionIcon>
                                         }
                                         {el?.status === 'FINISHED' &&
                                         <Group spacing={5}>
                                             <ActionIcon size={'xl'} color={'red'} variant={'outline'}>
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

                 </Group>




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