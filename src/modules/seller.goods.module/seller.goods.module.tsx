import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {
    ActionIcon,
    Avatar, Badge,
    Box,
    Button,
    Center,
    Container,
    Group,
    Image, LoadingOverlay,
    Paper,
    SegmentedControl,
    Text, Title
} from "@mantine/core";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper";
import GoodCard from "../../app.shared/app.components/good-card";
import {useSeller} from "../../app.shared/app.services/app.sellers.service";
import {useParams} from "react-router-dom";
import {Seller} from "../../app.shared/app.models/models";
import {initStateSeller} from "../neworder.module/neworder.module";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import "swiper/css";
import "swiper/css/pagination";

const SellerGoods = () => {

    const {id} = useParams()

    const getSeller = useSeller(id || "0")
    const [seller, setSeller] = useState<Seller>(initStateSeller)
    const cartStatus = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if (getSeller.watchedObject){
            console.log(getSeller.watchedObject)
            setSeller(getSeller.watchedObject)
            //dispatch(setGoods(getSeller.watchedObject.goods))
        }
    },[getSeller.watchedObject])

    return(
        <>
            <AppHeader title={<Text size={'lg'}>Профиль</Text>}/>
            {seller!==initStateSeller &&
                <Container py={65}>
                    <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                        <Title mb={10} align={'center'} order={2}>{seller.legalEntityName}</Title>
                        <Text align={'center'} my={10} size={'sm'} color={'gray'}>ИНН {seller.inn}</Text>
                        <Group position={'apart'}>
                            {
                                seller.dynamic ?
                                    <Badge color={'orange'} variant={'filled'} size={'lg'}>Бродяга</Badge>
                                    :
                                    <Badge color={'orange'} variant={'filled'} size={'lg'}>Лавка</Badge>
                            }
                            <Text size={'sm'}>
                                {seller.workTime}
                            </Text>
                        </Group>
                        <Group position={'apart'} py={'md'} mt={'10px'}>
                            <Group>
                                <Avatar radius={'md'} src={seller.cashier.photoUrl} alt="no image here" size={'xl'}/>
                                <Group direction={'column'} spacing={0}>
                                    <Text size={'md'}> { seller.cashier.firstname }</Text>
                                    <Text size={'md'}> { seller.cashier.lastname } </Text>
                                </Group>
                            </Group>
                            <Text size={'md'}> {seller.phone} </Text>
                        </Group>
                        <Group spacing={3} mt={'10px'}>
                            {
                                seller.tags.map((tag:string) => {
                                    return (
                                        <Badge color={ 'orange' } variant={'outline'} size={ 'lg' }> {tag} </Badge>
                                    )
                                })
                            }
                        </Group>
                    </Paper>
                    <Paper>
                        <Swiper
                            style={{marginTop:15, marginBottom:15}}
                            direction={"horizontal"}
                            pagination={{
                                clickable: true,
                            }}
                            height={200}
                            autoplay={true}
                            slidesPerView={1}
                            spaceBetween={1}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {seller.photosUrl.map((el)=> {
                                return (
                                    <SwiperSlide>
                                        <Image src={el} height={200}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </Paper>
                    <Title my={20} order={3}>Все товары</Title>
                    {
                        seller.goods.map((good, index) => {
                            return (
                                <GoodCard index={index} good={ good }/>
                            )
                        })
                    }
                </Container>
            || <LoadingOverlay visible={true}/>}
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