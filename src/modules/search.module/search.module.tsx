import React, { memo, useEffect, useState } from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import { ActionIcon, Button, Container, Grid, Group, Image, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { Minus, Plus, Search } from "tabler-icons-react";
import { useGoodList } from "../../app.shared/app.services/app.good.service";
import { useInputState } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useSellersList } from "../../app.shared/app.services/app.sellers.service";
import { Good } from "../../app.shared/app.models/models";
import { useAppDispatch } from "../../store/createstore";
import { useSelector } from "react-redux";
import { setAmount, setGoods } from "../../store/cart.store/cart-action-creators";


const GoodCard = memo((props:{good:Good, index:number, seller: string}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const data = useSelector(state => state.cart)

    const [addedToCart, setAddedToCart] = useState(0)

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
                        <Button size={'xs'} my={'md'}>
                            {props.seller}
                        </Button>
                    </Grid.Col>
                </Grid>
            </Group>
        </Group>
    )
})

// @ts-ignore
function flatten(arr?: Array<any>): Array<{good: Good, seller: string, index: number}> {
    return arr?.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

const SearchModule = () => {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false);

    const goods = useGoodList().watchedObject
    const sellers = useSellersList().watchedObject

    useEffect(() => {
        setVisible(goods === null)
    }, [goods])

    const [searchQuery, setSearchQuery] = useInputState('')

    return(
        <>
            <LoadingOverlay visible={visible}/>
            <AppHeader title={<Text size={'lg'}>Поиск товаров</Text>}/>
            <Container mt={68}>
                <TextInput icon={<Search/>} value={searchQuery} onChange={setSearchQuery} />
            </Container>
            {
                flatten(
                    sellers
                        ?.map(
                            (seller, index) => seller
                                ?.goods.map(good => ({
                                    good: good,
                                    seller: seller.legalEntityName,
                                    index: index,
                                }))
                        )
                )
                    ?.filter(item => searchQuery
                        ? item?.good.name.includes(searchQuery) || item?.good.name.includes(searchQuery.toLowerCase())
                        : true
                    )
                    .map((item, index) => item && <div onClick={
                        () => navigate(
                            `/seller/${item.index}`
                        )}>
                        <GoodCard index={index} good={ item?.good } seller={ item?.seller }/>
                    </div>)
            }
        </>
    )
}

export default {
    routeProps: {
        path: 'search',
        exact: true,
        index: false,
        element: <SearchModule/>,
    },
    name: 'Search',
};