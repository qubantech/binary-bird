import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Affix, Button, Container, LoadingOverlay, Text} from "@mantine/core";
import {ChevronRight} from "tabler-icons-react";
import {Good, Seller} from "../../app.shared/app.models/models";
import {useSeller} from "../../app.shared/app.services/app.sellers.service";
import GoodCard from "../../app.shared/app.components/good-card";
import {useAppSelector} from "../../store/createstore";

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

const NeworderModule = () => {

    const [seller, setSeller] = useState<Seller>(initStateSeller)
    const info = useSeller('0')

    const cartStatus = useAppSelector(state => state.cart)

    useEffect(() => {
        console.log(info)
        if (info.watchedObject) {
            setSeller(info.watchedObject)
        }
    },[info.watchedObject])

    return(
        <>
            <AppHeader title={<Text size={'lg'}>Новый заказ</Text>}></AppHeader>
            {seller !== initStateSeller &&
                <Container mt={65} mb={130}>
                    {seller.goods.map((el) => {
                        return(
                            <GoodCard good={el}/>
                        )
                    }
                    )}
                    <Affix  position={{bottom:85, left:0}} sx={{width:"100%"}}>
                        <Button size={'md'} px={15}
                                rightIcon={<ChevronRight/>} fullWidth>
                            Продолжить (565р.)
                        </Button>
                    </Affix>
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