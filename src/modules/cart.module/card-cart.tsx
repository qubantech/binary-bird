import React, {FC, useState} from 'react';
import { Image, Group, Text, Button, ActionIcon, Divider, SimpleGrid } from "@mantine/core";
import { ChartBubble, Minus, Plus } from "tabler-icons-react";
import {Good} from "../../app.shared/app.models/models";
import {TrashIcon} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/createstore";
import { setAmount, setGoods } from "../../store/cart.store/cart-action-creators";

interface CardCartProps {
    good: Good,
    index: string
}

const CardCart: FC<CardCartProps> = (props:{good: Good, index: string}) => {

    const dispatch = useAppDispatch()

    // @ts-ignore
    const data = useSelector(state => state.cart)

    return (
        <Group my={10} position={'apart'} sx={{
            backgroundColor: '#F8F9FA',
            border: '1px solid #EAEBEF',
            borderRadius: '6px',
            width: "100%"
        }}>
            <Group p={5} sx={{backgroundColor: "#FFF4E6", width:'100%'}} position={'apart'}>
                <Group>
                <Image
                    radius='md'
                    src={props.good.imageUrl}
                    alt='no image here'
                    width={100}
                    height={100}
                    fit='contain'
                />
                    <Group direction={'column'} spacing={0}>
                        <Text size={'md'}> {props.good.name[0].toUpperCase() + props.good.name.slice(1)} </Text>
                    </Group>
                </Group>
                <Group direction={'column'} position={'right'} spacing={15}>
                    <Group position={'center'} spacing={15}>
                        <ActionIcon onClick={() => {
                            dispatch(setAmount(props.good.uuid,data.amount[props.good.uuid] - 1))
                            data.amount[props.good.uuid] <= 1 &&
                                dispatch(setGoods([...data.goods].filter(g => g.uuid != props.index)))
                        }} size={'md'} radius={'lg'} variant={'light'} color={'orange'}>
                            <Minus/>
                        </ActionIcon>
                        <Text weight={700} align={'center'}>
                            {data.amount[props.good.uuid]}
                        </Text>
                        <ActionIcon onClick={() => {
                            dispatch(setAmount(props.good.uuid,data.amount[props.good.uuid] + 1))
                        }} size={'md'} radius={'lg'} variant={'light'} color={'orange'}>
                            <Plus/>
                        </ActionIcon>
                    </Group>
                    <Group grow position={'center'} spacing={4}>
                        <SimpleGrid cols={2} spacing={8}>
                            <Text style={{ lineHeight: '1.7', fontWeight: 700, color: '#3a3a3a' }}>
                                {props.good.price}
                            </Text>
                            <ActionIcon variant={'transparent'} color={ 'dark' } >
                                <ChartBubble size={20}/>
                            </ActionIcon>
                        </SimpleGrid>
                        <ActionIcon size={24} onClick={() => {
                            dispatch(setGoods([...data.goods].filter(g => g.uuid != props.index)))
                            dispatch(setAmount(props.good.uuid,0))
                        }}>
                            <TrashIcon height={24} width={24}/>
                        </ActionIcon>
                    </Group>
                </Group>
            </Group>
        </Group>
    );
};

export default CardCart;