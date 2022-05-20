import React, {FC, useState} from 'react';
import {Good} from "../app.models/models";
import {Image, Group, Text, Button, ActionIcon} from "@mantine/core";
import {Minus, Plus} from "tabler-icons-react";

interface GoodCardProps {
    good: Good
}

const GoodCard: FC<GoodCardProps> = ({good}) => {
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
                <Image
                    radius='md'
                    src='https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                    alt='no image here'
                    width={100}
                    height={100}
                    fit='contain'
                />
                <Group direction={'column'} spacing={0}>
                    <Text size={'md'}> {good.name} </Text>
                    <Text size={'md'}> {good.description} </Text>
                </Group>
            </Group>
            {
                addedToCart > 0 ?
                    <Group grow sx={{width: "100%"}} position={'left'}>
                        <Group position={'center'}>
                            <ActionIcon onClick={() => setAddedToCart(addedToCart - 1)} size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Minus/>
                            </ActionIcon>
                            <Text weight={700} align={'center'}>{addedToCart}</Text>
                            <ActionIcon onClick={() => setAddedToCart(addedToCart + 1)} size={'lg'} radius={'xl'}
                                        variant={'light'} color={'orange'}>
                                <Plus/>
                            </ActionIcon>
                        </Group>
                        <Group grow position={'center'}>
                            <Button size={'md'} sx={{width: "100%"}} onClick={() => setAddedToCart(0)}> <Group
                                spacing={0} align={'center'} direction={'column'}>
                                <Text size={"xs"}>В корзине</Text>
                                {good.price}₽
                            </Group></Button>
                        </Group>
                    </Group>
                    :
                    <Button fullWidth size={'md'} variant={'outline'} onClick={() => setAddedToCart(1)}>
                        <Group spacing={0} align={'center'} direction={'column'}>
                            <Text size={"xs"}>Добавить в корзину</Text>
                            {good.price}₽
                        </Group>
                    </Button>
            }

        </Group>
    );
};

export default GoodCard;