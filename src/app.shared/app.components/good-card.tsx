import React, { FC, memo, useState } from 'react';
import {Good} from "../app.models/models";
import {Image, Group, Text, Button, ActionIcon, Grid} from "@mantine/core";
import {Minus, Plus} from "tabler-icons-react";
import {useAppDispatch} from "../../store/createstore";
import { setAmount, setGoods } from "../../store/cart.store/cart-action-creators";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoodCard = memo((props:{good:Good, index:number}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const data = useSelector(state => state.cart)

    const [addedToCart, setAddedToCart] = useState(data.amount[props.good.uuid] || 0)

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
                    </Grid.Col>
                </Grid>
            </Group>
            {
                addedToCart > 0 ?
                    <Group grow sx={{width: "100%"}} position={'left'}>
                        <Group position={'center'}>
                            <ActionIcon onClick={() =>
                            {
                                dispatch(setAmount(props.good.uuid,addedToCart - 1))
                                setAddedToCart(addedToCart - 1)
                                addedToCart == 0 && dispatch(setGoods([...data.goods].splice(props.index, 1)))
                            }
                            } size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Minus/>
                            </ActionIcon>
                            <Text weight={700} align={'center'}>{addedToCart}</Text>
                            <ActionIcon onClick={() => {
                                dispatch(setAmount(props.good.uuid,addedToCart+1))
                                setAddedToCart(addedToCart + 1)
                            }} size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Plus/>
                            </ActionIcon>
                        </Group>
                        <Group grow position={'center'}>
                            <Button size={'md'} sx={{width: "100%"}} onClick={() => {
                                navigate('/cart')
                            }}> <Group
                                spacing={0} align={'center'} direction={'column'}>
                                <Text size={"xs"}>?? ??????????????</Text>
                                {props.good.price * addedToCart}
                            </Group></Button>
                        </Group>
                    </Group>
                    :
                    <Button fullWidth size={'md'} variant={'outline'} onClick={() => {
                        setAddedToCart(1)
                        dispatch(setGoods([...data.goods, props.good]))
                        dispatch(setAmount(props.good.uuid,1))
                    }}>
                        <Group spacing={0} align={'center'} direction={'column'}>
                            <Text size={"xs"}>???????????????? ?? ??????????????</Text>
                            {props.good.price}
                        </Group>
                    </Button>
            }

        </Group>
    );
});

export default GoodCard;