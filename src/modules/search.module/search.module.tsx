import React, { memo, useEffect, useState } from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import { Center, Loader, ActionIcon, Button, Container, Grid, Group, Image, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { Minus, Plus, Search } from "tabler-icons-react";
import { useGoodList } from "../../app.shared/app.services/app.good.service";
import { useInputState } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useSellersList } from "../../app.shared/app.services/app.sellers.service";
import { Good } from "../../app.shared/app.models/models";
import { useAppDispatch } from "../../store/createstore";
import { useSelector } from "react-redux";
import { setAmount, setGoods } from "../../store/cart.store/cart-action-creators";
import {$recommendApi, RECPOINT} from "../../app.shared/app.services/app.recommend.service";


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
    const [recGoods, setRecGoods] = useState<Good[]>()

    const goods = useGoodList().watchedObject
    const sellers = useSellersList().watchedObject

    useEffect(() => {
        setVisible(goods === null)
        $recommendApi.get(RECPOINT.GET_RECOMMEND())
            .then((resp) => {
                console.log(JSON.parse(resp.data.slice(0, 10636) + ']')[2])
                setRecGoods(JSON.parse(resp.data.slice(0, 10636) + ']')[3])
            })
    }, [goods])

    const [searchQuery, setSearchQuery] = useInputState('')

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <LoadingOverlay visible={visible}/>
            <AppHeader title={<Text size={'lg'}>Поиск товаров</Text>}/>
            <Container mt={68}>
                <TextInput placeholder={'Введите начало названия для поиска'} icon={<Search/>} value={searchQuery} onChange={setSearchQuery}/>
            </Container>
            <div style={{paddingBottom:'65px'}}>
                {
                    searchQuery &&
                    <Group spacing={ 0 } direction={ 'column' } sx={{
                        backgroundColor: '#F1F3F5',
                        width: '100vw',
                        margin: '0 0 0 0',
                        padding: '0 20px 80px 20px'
                    }} >
                        <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Результаты поиска</Text>
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
                        </Group>
                    ||
                    (recGoods && <>
                    <Group spacing={ 0 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 0', padding: '0px 20px 10px 20px'}} >
                        <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Вы недавно заказали</Text>
                        <div onClick={
                            () => navigate(
                                `/seller/${Number(0) % 9}`
                            )}>
                            {/*//@ts-ignore*/}
                            <GoodCard good={recGoods['item']} index={0} seller={"ИП Иванов И.И."}/>
                        </div>
                    </Group>
                    <Group spacing={ 0 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 0', padding: '0 20px 80px 20px'}} >
                        <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Возможно Вам понравится</Text>
                            <div onClick={
                                () => navigate(
                                    `/seller/${Number(1) % 9}`
                                )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec1']} index={0} seller={"ИП Иванов И.И."}/>
                            </div>
                        <div onClick={
                            () => navigate(
                                `/seller/${Number(2) % 9}`
                            )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec2']} index={0} seller={"ИП Иванов И.И."}/>
                        </div>
                        <div onClick={
                            () => navigate(
                                `/seller/${Number(3) % 9}`
                            )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec3']} index={0} seller={"ИП Иванов И.И."}/>
                        </div>
                    </Group>
                    </>) || <Center>
                        <Loader/>
                    </Center>
                }
            </div>
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