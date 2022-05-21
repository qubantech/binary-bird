import React, {FC, useState} from 'react';
import {Image, Group, Text, Button, ActionIcon, Divider} from "@mantine/core";
import {Minus, Plus} from "tabler-icons-react";
import {Good} from "../../app.shared/app.models/models";
import {TrashIcon} from "@radix-ui/react-icons";

interface CardCartProps {
    good: Good
}

const CardCart: FC<CardCartProps> = ({good}) => {
    const [addedToCart, setAddedToCart] = useState(1)


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
                    src='https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                    alt='no image here'
                    width={100}
                    height={100}
                    fit='contain'
                />
                    <Group direction={'column'} spacing={0}>
                        <Text size={'md'}> {good.name} </Text>
                    </Group>
                </Group>
                <Group direction={'column'} position={'right'} spacing={5}>
                    <Group position={'center'} spacing={15}>
                        <ActionIcon onClick={() => setAddedToCart(addedToCart - 1)} size={'md'} radius={'lg'}
                                    variant={'light'} color={'orange'}>
                            <Minus/>
                        </ActionIcon>
                        <Text weight={700} align={'center'}>{addedToCart}</Text>
                        <ActionIcon onClick={() => setAddedToCart(addedToCart + 1)} size={'md'} radius={'lg'}
                                    variant={'light'} color={'orange'}>
                            <Plus/>
                        </ActionIcon>
                    </Group>
                    <Group grow position={'center'} spacing={10}>
                        <Text>5462р</Text>
                        <ActionIcon>
                            <TrashIcon/>
                        </ActionIcon>
                    </Group>
                </Group>
            </Group>
                    {/*<Group grow sx={{width: "100%"}} position={'left'}>*/}
                    {/*    <Group position={'center'}>*/}
                    {/*        <ActionIcon onClick={() => setAddedToCart(addedToCart - 1)} size={'lg'} radius={'xl'}*/}
                    {/*                    variant={'light'} color={'orange'}>*/}
                    {/*            <Minus/>*/}
                    {/*        </ActionIcon>*/}
                    {/*        <Text weight={700} align={'center'}>{addedToCart}</Text>*/}
                    {/*        <ActionIcon onClick={() => setAddedToCart(addedToCart + 1)} size={'lg'} radius={'xl'}*/}
                    {/*                    variant={'light'} color={'orange'}>*/}
                    {/*            <Plus/>*/}
                    {/*        </ActionIcon>*/}
                    {/*    </Group>*/}
                    {/*    <Group grow position={'center'}>*/}
                    {/*        5462р*/}
                    {/*        <ActionIcon>*/}
                    {/*            <TrashIcon/>*/}
                    {/*        </ActionIcon>*/}
                    {/*    </Group>*/}
                    {/*</Group>*/}

        </Group>
    );
};

export default CardCart;