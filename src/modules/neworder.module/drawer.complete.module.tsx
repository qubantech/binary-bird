import {ActionIcon, Center, Drawer, Group, Space, Text, Title} from "@mantine/core";
import Scanner from "../camera.module/html5qrcomponents/scanner";
import React from "react";
import {ArrowDown, ArrowRight, Check} from "tabler-icons-react";
import {OrderCreateDto, Seller} from "../../app.shared/app.models/models";

export const DrawerCompleteModule = (props:{isOpen: boolean, setOpen: (b:boolean) => void, sellerName:string, order?:OrderCreateDto}) => {
    return (
        <Drawer
            padding="xl"
            lockScroll
            size="50%"
            position="bottom"
            zIndex={700}
            opened={props.isOpen}
            onClose={() => props.setOpen(false)}>
            <Center>
                <Group align={'center'} direction={'column'}>
                    <ActionIcon radius={'xl'} color={'green'} variant={'filled'} size={70}>
                        <Check size={50}/>
                    </ActionIcon>
                    <Title order={3}>Заказ подтвержден</Title>
                    <Text size={'xl'}>{props.sellerName}</Text>
                    <Text weight={700} size={'xl'}>{props.order && props.order.totalPrice} жемчужинок</Text>
                    <Text size={'sm'} color={'gray'}>{props.order && props.order.closedAt}</Text>
                    <Group align={'center'} direction={"column"} spacing={0}>
                    <Text color={'gray'} mt={15} size={'sm'}>{props.order && props.order.buyerUid}</Text>
                    <ArrowDown size={30}/>
                    <Text color={'gray'} size={'sm'}>{props.order && props.order.sellerUid}</Text>
                    </Group>

                </Group>
            </Center>
        </Drawer>
    )
}