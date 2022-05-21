import React, { useEffect, useState } from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import { Container, LoadingOverlay, Text, TextInput } from "@mantine/core";
import {Search} from "tabler-icons-react";
import { useGoodList } from "../../app.shared/app.services/app.good.service";
import GoodCard from "../../app.shared/app.components/good-card";
import { useInputState } from "@mantine/hooks";

const SearchModule = () => {
    const [visible, setVisible] = useState(false);

    const goods = useGoodList().watchedObject

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
                goods
                    ?.filter(good => searchQuery ? good?.name.includes(searchQuery) : true)
                    .map((good, index) => good && <GoodCard index={index} good={ good }/>)
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