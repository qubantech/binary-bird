import {ActionIcon, Avatar, Badge, Center, Drawer, Group, List, Paper, Text, Title} from "@mantine/core";
import PointDrawerContent from "../../../modules/map.module/components/point-drawer-content";
import React, {useState} from "react";
import {Order} from "../../app.models/models";
import {ArrowDown, Check, Rotate2} from "tabler-icons-react";

export const MyDrawer = (props:{ order:Order, isOpen:boolean, setOpen:(b:boolean) => void}) => {
    return (
        <Drawer
            lockScroll={ false }
            opened={props.isOpen}
            onClose={() => props.setOpen(false)}
            title={
                <Text size={ 'lg' }>
                    Подробности о заказе
                </Text>
            }
            padding="xl"
            size="70%"
            position="bottom"
            zIndex={700}
        >
            {props.order.status == "FINISHED" &&
                <Badge color={'green'} variant={'filled'}>Заказ подтвержден</Badge>
            }
            {props.order.status == "PLACED" &&
                <Badge color={'orange'} variant={'filled'}>Заказ в обработке</Badge>
            }
            <Group spacing={0} py={10} position={'center'} align={'start'} direction={'column'}>
                <Text size={'xs'} color={'gray'}>От: {props.order.createdAt}
                </Text>
                {props.order.closedAt && <Text size={'xs'} color={'gray'}>
                    Завершен: {props.order.closedAt}
                </Text>}
            </Group>
            <Group pb={10} direction={'column'} sx={{border:'2px solid #F1F3F5', borderRadius:'15px'}}>
                <Paper sx={{width:'100%', backgroundColor:'#F1F3F5'}}>
                    <Title px={15} color={'gray'} my={10} order={4}>Информация о заказе</Title>
                </Paper>
                <Group px={15} align={'left'} spacing={0} direction={'column'}>
                    <Group>
                        <ActionIcon variant={'hover'}>
                            <Avatar size={30}/>
                        </ActionIcon>
                        <Text> Код отправителя</Text>
                    </Group>
                    <Text size={'sm'}>
                        {props.order.buyerUid}
                    </Text>
                    <List size={'sm'} sx={{fontWeight:600}}>
                        <List.Item>Код получателя</List.Item>
                    </List>
                    <Text size={'sm'}>
                        {props.order.sellerUid}
                    </Text>
                </Group>
                <Group spacing={10} px={15} position={'apart'} sx={{border:"1px solid gray", borderWidth: "0px 0px 1px 0px", width: "100%"}}>
                    <Text weight={700}>Итого:</Text>
                    <Text weight={700}>{props.order.totalPrice}</Text>
                </Group>
            {props.order.goods.map((el) =>{
                if (el.quantity>0)
                    return(
                        <Group px={15} spacing={10} position={'apart'} sx={{border:"1px solid gray", borderWidth: "0px 0px 1px 0px", width: "100%"}}>
                            <Text>{el.good.name}</Text>
                            <Group>
                                <Text>{el.quantity}</Text>
                                <Text>{el.quantity * el.good.price}</Text>
                            </Group>
                        </Group>
                    )
            })}
            </Group>
        </Drawer>
    )
}