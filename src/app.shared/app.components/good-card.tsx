import React, {FC, useState} from 'react';
import {Good} from "../app.models/models";
import {Image, Group, Text, Button, ActionIcon, Grid} from "@mantine/core";
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
                <Grid pt={10}>
                    <Grid.Col span={5}>
                        <Image
                            radius='sm'
                            src={good.imageUrl}
                            alt='no image here'
                            fit='contain'
                            width={'100%'}
                        />
                    </Grid.Col>
                    <Grid.Col span={7}>
                            <Group direction={'column'} spacing={0}>
                                <Text size={'md'} weight={700}> {good.name} </Text>
                                <Text size={'md'}> {good.description} </Text>
                            </Group>
                    </Grid.Col>
                </Grid>
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
                                {good.price * addedToCart}₽
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