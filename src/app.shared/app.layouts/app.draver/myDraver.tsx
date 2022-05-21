import {ActionIcon, Avatar, Badge, Center, Divider, Drawer, Group, List, Paper, Text, Title} from "@mantine/core";
import PointDrawerContent from "../../../modules/map.module/components/point-drawer-content";
import React, {useState} from "react";
import {Order} from "../../app.models/models";
import {ArrowDown, ChartBubble, Check, CreditCard, MoodSmile, Rotate2} from "tabler-icons-react";

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
            <Group  spacing={0} py={10} position={'center'} align={'start'} direction={'column'}>
                <Text size={'xs'} color={'gray'}>От: {props.order.createdAt}
                </Text>
                {props.order.closedAt && <Text size={'xs'} color={'gray'}>
                    Завершен: {props.order.closedAt}
                </Text>}
            </Group>
            <Group pb={ '20px' } direction={'column'} sx={{border:'2px solid #F1F3F5', borderRadius:'15px', boxShadow: '0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px'}}>
                <Paper sx={{width:'100%', backgroundColor:'#F1F3F5'}}>
                    <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '15px 0 5px 10px'}}>Информация о заказе</Text>
                </Paper>
                <Group align={'left'} spacing={0} direction={'column'} sx={{padding: '0 0 0 15px', width: '100%'}}>
                    <Group align={ 'start' }>
                        <ActionIcon variant={'transparent'}>
                            <MoodSmile size={30}/>
                        </ActionIcon>
                        <Group direction={ 'column' } spacing={ 1 } mb={ '10px' }>
                            <Text weight={ 700 } size={ 'sm' }> Код получателя</Text>
                            <Text size={'sm'}> {props.order.buyerUid} </Text>
                        </Group>
                        {/*<Divider size={ 'lg' } color={ 'black' }/>*/}
                    </Group>
                    <Group align={ 'start' } mb={ '30px' }>
                        <ActionIcon variant={'transparent'}>
                            <MoodSmile size={30}/>
                        </ActionIcon>
                        <Group direction={ 'column' } spacing={ 1 }>
                            <Text weight={ 700 } size={ 'sm' }> Код отправителя</Text>
                            <Text size={'sm'}> {props.order.sellerUid} </Text>
                        </Group>

                    </Group>

                    <Group align={ 'start' } sx={{maxHeight: '35px'}}>
                        <ActionIcon variant={'transparent'}>
                            <CreditCard size={30}/>
                        </ActionIcon>
                        <Group position={ 'apart' } sx={{width: '85%'}}>
                            <Text weight={700} size={ 'sm' }>Оплачено</Text>

                            <Group spacing={5}>
                                <Text weight={700} size={ 'md' }>{props.order.totalPrice}</Text>
                                <ActionIcon variant={'transparent'} color={ 'dark' } >
                                    <ChartBubble size={25}/>
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Group>
                    {props.order.goods.map((el) =>{
                        if (el.quantity>0)
                            return(
                                <Group spacing={10} position={'apart'} sx={{width: "100%", padding: '0 5px 0 45px'}}>
                                    <Text>{el.good.name}</Text>
                                    <Group spacing={ 30 }>
                                        <Text>{el.quantity}</Text>

                                        <Group spacing={8}>
                                            <Text>{el.quantity * el.good.price}</Text>
                                            <ActionIcon variant={'transparent'} color={ 'dark' } >
                                                <ChartBubble size={25}/>
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                </Group>
                            )
                    })}

                </Group>

            </Group>
        </Drawer>
    )
}