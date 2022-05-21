import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Center,
    Divider,
    Drawer,
    Group,
    List,
    Paper,
    Text,
    Title
} from "@mantine/core";
import PointDrawerContent from "../../../modules/map.module/components/point-drawer-content";
import React, {useState} from "react";
import {Order} from "../../app.models/models";
import {
    ArrowDown,
    ChartBubble,
    Check,
    ChevronRight,
    CreditCard,
    MoodSmile,
    Phone,
    Rotate2,
    X
} from "tabler-icons-react";

export const ActiveDrawer = (props:{ order:Order, isOpen:boolean, setOpen:(b:boolean) => void}) => {
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
            <Group  spacing={0} py={10} position={'center'} align={'start'} direction={'column'}>
                <Text size={'xs'} color={'gray'}>От: {props.order.createdAt}</Text>
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
                            <Text weight={700} size={ 'sm' }>Израсходовано</Text>

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
                                <Group spacing={10} position={'apart'} sx={{width: "100%", padding: '0 5px 0 0px'}}>
                                    <Group spacing={17}>
                                    <ActionIcon variant={'filled'} color={'green'} radius={'xl'}><Check size={25}/></ActionIcon>
                                    <Text>{el.good.name}</Text>
                                    </Group>
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
            <Group my={30} position={'center'} align={'apart'} spacing={5}>
                <Paper shadow={ 'md' } sx={{padding: '10px 10px 10px 10px', minWidth: '90px', height: '100px', backgroundColor:"#40C057"}}>
                    <Group direction={ 'column' } align={'center'} spacing={ 20 }>
                        <Group spacing={2}>
                            <ActionIcon variant={'transparent'} color={ 'dark' } >
                                <Check size={25}/>
                            </ActionIcon>
                        </Group>
                        <Text size={'sm'} weight={700}>Заказ готов к выдаче</Text>
                    </Group>
                </Paper>
                <Paper shadow={ 'md' } sx={{padding: '10px 10px 10px 10px', minWidth: '90px', height: '100px', backgroundColor:"#FFA94D"}}>
                    <Group direction={ 'column' } align={'center'} spacing={ 20 }>
                        <Group spacing={2}>
                            <ActionIcon variant={'transparent'} color={ 'dark' } >
                                <Phone size={25}/>
                            </ActionIcon>
                        </Group>
                        <Text size={'sm'} weight={700}>Позвонить заказчику</Text>
                    </Group>
                </Paper>
                <Paper shadow={ 'md' } sx={{padding: '10px 10px 10px 10px', minWidth: '90px', height: '100px', backgroundColor:"gray"}}>
                    <Group direction={ 'column' } align={'center'} spacing={ 20 }>
                        <Group spacing={2}>
                            <ActionIcon variant={'transparent'} color={ 'dark' } >
                                <X size={25}/>
                            </ActionIcon>
                        </Group>
                        <Text size={'sm'} weight={700}>Отменить заказ</Text>
                    </Group>
                </Paper>
                {/*<Paper>*/}
                {/*    <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>*/}
                {/*        <Check/>*/}
                {/*    </ActionIcon>*/}
                {/*    <Text>Заказ готов</Text>*/}
                {/*</Paper>*/}
            </Group>
        </Drawer>
    )
}