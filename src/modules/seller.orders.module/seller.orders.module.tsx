import React, {useEffect} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Title, Text, Group, ActionIcon, Paper, Center, Loader} from "@mantine/core";
import {AlertCircle, Check, ChevronRight, Pencil, Replace, Rotate2, Wallet} from "tabler-icons-react";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useAppSelector} from "../../store/createstore";
import {useSellersList} from "../../app.shared/app.services/app.sellers.service";

const SellerOrdersModule = () => {
    const orders = useOrdersList()
    const sellers = useSellersList()
    const userStatus = useAppSelector(state => state.user)

    useEffect(()=> {console.log(orders)},[orders])

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Заказы продавца</Text>}/>
             <Container mt={65}>
                 <Title order={3} py={10}>
                     Активные заказы
                 </Title>

                 <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                     <Group position={'apart'}>
                         <Group spacing={10}>
                             <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>
                                 <Rotate2/>
                             </ActionIcon>
                             <Group direction={'column'} spacing={1}>
                                 <Text>Имя продавца</Text>
                                 <Text size={'sm'} color={'gray'}>время</Text>
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

                 {orders && orders.watchedObject && orders.watchedObject.reverse().filter((el) => el?.sellerUid === userStatus.uuid).map((el) => {
                     return (
                     <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                         <Group position={'apart'}>
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
                                     <Text>{sellers && sellers.watchedObject && sellers.watchedObject?.filter((ell)=> el?.sellerUid === ell?.uuid)[0]?.legalEntityName || ""}</Text>
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