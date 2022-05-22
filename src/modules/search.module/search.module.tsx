import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Center, Container, Group, Loader, LoadingOverlay, Text, TextInput, Title} from "@mantine/core";
import {Search} from "tabler-icons-react";
import {useGoodList} from "../../app.shared/app.services/app.good.service";
import GoodCard from "../../app.shared/app.components/good-card";
import {useInputState} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {useSellersList} from "../../app.shared/app.services/app.sellers.service";
import {$recommendApi, RECPOINT} from "../../app.shared/app.services/app.recommend.service";
import {Good} from "../../app.shared/app.models/models";

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
                    <Group spacing={ 0 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 0', padding: '0 20px 80px 20px'}} >
                        <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Результаты поиска</Text>
                        {goods?.filter(good => searchQuery ? good?.name.includes(searchQuery) : true)
                        .map((good, index) => good && <div onClick={
                            () => navigate(
                                `/seller/${Number(index) % 9}`
                            )}>
                            <GoodCard index={index} good={good}/>
                        </div>)}
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
                        <GoodCard good={recGoods['item']} index={0}/>
                        </div>
                    </Group>
                    <Group spacing={ 0 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 0', padding: '0 20px 80px 20px'}} >
                        <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>Возможно Вам понравится</Text>
                            <div onClick={
                                () => navigate(
                                    `/seller/${Number(1) % 9}`
                                )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec1']} index={0}/>
                            </div>
                        <div onClick={
                            () => navigate(
                                `/seller/${Number(2) % 9}`
                            )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec2']} index={0}/>
                        </div>
                        <div onClick={
                            () => navigate(
                                `/seller/${Number(3) % 9}`
                            )}>
                        {/*//@ts-ignore*/}
                        <GoodCard good={recGoods['rec3']} index={0}/>
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