import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {
    ActionIcon,
    Avatar, Badge,
    Box,
    Button,
    Center,
    Container,
    Group,
    Image,
    Paper,
    SegmentedControl,
    Text, Title
} from "@mantine/core";
import GoodCard from "../../app.shared/app.components/good-card";

const SellerGoods = () => {
    return(
        <>
            <AppHeader title={<Text size={'lg'}>Профиль</Text>}/>
            <Container pt={65}>
                <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                <Group>
                    {/*{*/}
                    {/*    seller.dynamic ?*/}
                            <Badge size={ 'lg' }>Бродяга</Badge>
                            {/*:*/}
                            {/*<Badge size={ 'lg' }>Лавка</Badge>*/}
                    {/*}*/}
                    <Text size={ 'sm' }>
                        09:00-20:00
                        {/*{seller.workTime}*/}
                    </Text>
                </Group>
                    <Text pl={13}>ИНН 34567890</Text>
                <Group position={ 'apart' } p={'md'} mt={ '10px' }>
                    <Group>
                        <Avatar src={null} alt="no image here" size={ 'xl' } />
                        <Group direction={ 'column' } spacing={ 0 }>
                            <Text size={ 'md' }> first {/*{ seller.cashier.firstname } */}</Text>
                            <Text size={ 'md' }> last {/*{ seller.cashier.lastname }*/} </Text>
                        </Group>
                    </Group>
                    <Text size={ 'md' }> +98765456789 </Text>
                </Group>
                <Group spacing={ 3 } mt={ '10px' }>
                    <Badge color={ 'yellow' }  size={ 'lg' }>tag</Badge>
                    {/*{*/}
                    {/*    seller.tags.map((tag:string) => {*/}
                    {/*        return (*/}
                    {/*            <Badge color={ 'yellow' }  size={ 'lg' }> {tag} </Badge>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </Group>
                {/*{*/}
                {/*    seller.goods.map((good) => {*/}
                {/*        return (*/}
                {/*            <GoodCard good={ good }/>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                </Paper>

            </Container>
        </>
    )
}
export default {
    routeProps: {
        path: 'seller/:id',
        exact: true,
        index: false,
        element: <SellerGoods/>,
    },
    name: 'SellerGoods',
};