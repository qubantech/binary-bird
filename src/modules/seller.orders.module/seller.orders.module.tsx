import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Title, Text, Group, ActionIcon, Paper} from "@mantine/core";
import {ChevronRight, Rotate2} from "tabler-icons-react";

const SellerOrdersModule = () => {
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