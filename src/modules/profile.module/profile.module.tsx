import React, {useEffect, useState} from 'react';
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {
    ActionIcon,
    Avatar, Box, Button,
    Center,
    Container,
    Grid,
    Group,
    Image, Loader,
    Paper,
    SegmentedControl,
    Select,
    Text, Title
} from "@mantine/core";
import Pearl from '../../app.shared/app.images/pearl.svg'
//@ts-ignore
import SBP from '../../app.shared/app.images/sbp.png'
import {
    AlertCircle,
    ArrowRight, ChartBubble,
    Check, ChevronRight,
    CreditCard, Cross,
    ExternalLink, Logout,
    Pencil, Qrcode,
    Report,
    Rotate2,
    Ticket, Wallet, X
} from "tabler-icons-react";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../../app.shared/app.configs";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import {setUser, setUUID} from "../../store/user.store/user-action-creators";
import {initStateUser} from "../../store/user.store/user-reducer";
import {Order, OrderedGood, OrderStatus} from "../../app.shared/app.models/models";
import {MyDrawer} from "../../app.shared/app.layouts/app.draver/myDraver";
import {QrModal} from "./qrModal";
import {useOrder, useOrdersList} from "../../app.shared/app.services/app.order.service";
import {useSellersList} from "../../app.shared/app.services/app.sellers.service";
import {transactionsService} from "../../app.shared/app.services/app.transactions.service";


export const initStateOrder:Order = {
    uuid: "",
    buyerUid: "",
    sellerUid: "",
    goods: [],
    totalPrice: 0,
    status: 'PLACED',
    createdAt: "",
    closedAt: ""
}

const Profile = () => {
    const navigate = useNavigate()
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [drawerOrder,setDrawerOrder] = useState<Order>(initStateOrder)
    const [balance, setBalance] = useState(0)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isQr, setQr] = useState<boolean>(false)
    const orders = useOrdersList()
    const sellers = useSellersList()

    const logout = () => {
        signOut(auth);
        dispatch(setUser(initStateUser))
        dispatch(setUUID(""))
        navigate("/")
    }

    useEffect(() => {
        transactionsService.getUserBalance(userStatus.uuid)
            .then((resp)=>{
                console.log(resp)
                setBalance(resp.data.value)
            })
    },[])

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Профиль</Text>}/>
            <Container py={55}>
                <MyDrawer order={drawerOrder} isOpen={isOpen} setOpen={setOpen}/>
                <QrModal isOpen={isQr} setOpen={setQr} uid={userStatus.uuid || ""}/>

                <Group position={ 'apart' }  sx={{backgroundColor: '#fd7e14', width: '100vw', margin: '0 0 0 -16px', padding: '20px 20px 80px 20px'}}>
                    <Group>
                        <Avatar size={65} radius={ 'xl' } color={ 'gray' }/>
                        <Group direction={'column'} spacing={1}>
                            <Text weight={700} size={'xl'} sx={{color: '#F1F3F5'}}>
                                {userStatus.userInfo.firstname || "Имя"} {userStatus.userInfo.lastname || 'Фамилия'}
                            </Text>
                            <Text size={ 'sm' } sx={{color: '#F1F3F5'}}>
                                {userStatus.userInfo.phone || "phone number"}
                            </Text>
                        </Group>
                    </Group>
                    <ActionIcon  variant={ 'transparent' } onClick={() => logout()}>
                        <Logout size={ 70 } color={ 'white' }/>
                    </ActionIcon>
                </Group>

                <Group spacing={ 8 } sx={{marginTop: '-50px', marginBottom: '30px' }} position={'apart'}>
                    <Paper shadow={ 'md' } sx={{padding: '10px 20px 10px 10px', minWidth: '90px', height: '100px'}}>
                        <Group direction={ 'column' } spacing={ 20 }>
                            <Text size={ 'sm' } >Жемчужины</Text>
                            <Group spacing={2}>
                                <ActionIcon variant={'transparent'} color={ 'dark' } >
                                    <ChartBubble size={25}/>
                                </ActionIcon>
                                <Text weight={700}>{balance && balance}</Text>
                            </Group>
                        </Group>
                    </Paper>
                    <Paper shadow={ 'md' } sx={{padding: '10px 20px 10px 10px', minWidth: '100px', height: '100px'}}>
                        <Group direction={ 'column' } spacing={ 20 }>
                            <Text size={ 'sm' } >Заморожено</Text>
                            <Group spacing={2}>
                                <ActionIcon variant={'transparent'} color={ 'dark' } >
                                    <ChartBubble size={25}/>
                                </ActionIcon>
                                <Text weight={700}>60</Text>
                            </Group>
                        </Group>
                    </Paper>
                    <Paper shadow={ 'md' } sx={{padding: '25px 0 0 25px', minWidth: '100px', height: '100px'}}>
                        <ActionIcon onClick={() => setQr(true)}  variant={'filled'} size={50}>
                            <Qrcode size={'xl'}/>
                        </ActionIcon>
                    </Paper>
                </Group>

                {/*<Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}} onClick={() => logout()}>*/}
                {/*    <Group position={'apart'}>*/}
                {/*        <Group align={'start'}>*/}
                {/*            <Avatar size={65}>*/}
                {/*                s*/}
                {/*            </Avatar>*/}
                {/*            <Group direction={'column'} spacing={10}>*/}
                {/*                <Text weight={600} size={'xl'}>*/}
                {/*                    {userStatus.userInfo.firstname || "Имя"} {userStatus.userInfo.lastname || 'Фамилия'}*/}
                {/*                </Text>*/}
                {/*                <Text>*/}
                {/*                    {userStatus.userInfo.phone || "phone number"}*/}
                {/*                </Text>*/}
                {/*            </Group>*/}
                {/*        </Group>*/}
                {/*    </Group>*/}
                {/*</Paper>*/}
                {/*<Paper mt={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>*/}
                {/*    <Group px={10} position={'apart'}>*/}
                {/*    <Group pt={5} align={'center'} spacing={5}>*/}
                {/*        <Image src={Pearl} mr={15} style={{height: 40, width: 40}}/>*/}
                {/*        <Group direction={'column'} spacing={0}>*/}
                {/*            <Group spacing={7}>*/}
                {/*                <Text size={'xl'} weight={700}>{balance && balance}</Text>*/}
                {/*                <Text>жемчужин</Text>*/}
                {/*            </Group>*/}
                {/*            <Text color={'gray'} size={'sm'}>(заморожено 60)</Text>*/}
                {/*        </Group>*/}
                {/*    </Group>*/}
                {/*        <Group spacing={10}>*/}
                {/*        <ActionIcon onClick={() => setQr(true)} color={'orange'} variant={'filled'} size={50}>*/}
                {/*            <Qrcode size={'xl'}/>*/}
                {/*        </ActionIcon>*/}
                {/*        </Group>*/}
                {/*    </Group>*/}
                {/*</Paper>*/}


                <Group mt={10} mb={40} direction={ 'column' } spacing={ 5 }>
                    <SegmentedControl
                        sx={{width: '100%'}}
                        data={[
                            {
                                value: 'preview',
                                label: (
                                    <Center>
                                        <Image style={{height: 23, width: 20}} src={SBP}></Image>
                                        <Box ml={10}><Text size={'lg'}>СБП</Text></Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'code',
                                label: (
                                    <Center>
                                        <CreditCard size={23}/>
                                        <Box ml={10}><Text size={'lg'}>Карта</Text></Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                    <Button size={'lg'} fullWidth variant={ 'outline' }>Пополнить</Button>
                </Group>

                <Group spacing={ 10 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 -16px', padding: '0 20px 80px 20px'}} >
                    <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>История заказов</Text>
                    {/*//@ts-ignore*/}
                    {orders && orders.watchedObject && console.log(orders.watchedObject.filter((el) => el.buyerUid === userStatus.uuid))}
                    {orders && orders.watchedObject && orders.watchedObject.filter((el) => el?.buyerUid === userStatus.uuid).map((el) => {
                        return (
                            <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#ffffff", width: '100%'}} onClick={() =>{
                                if (el) setDrawerOrder(el)
                                console.log(el)
                                setOpen(true)}}
                            >
                                <Group position={'apart'}>
                                    <Group spacing={10}>
                                        {el?.status === 'PLACED' &&
                                        <ActionIcon size={'xl'} color={'orange'} variant={'light'} radius={'xl'}>
                                            <Rotate2/>
                                        </ActionIcon>
                                        }
                                        {el?.status ==='CANCELLED' &&
                                        <ActionIcon size={'xl'} color={'gray'} variant={'light'} radius={'xl'}>
                                            <X/>
                                        </ActionIcon>}
                                        {el?.status === 'FINISHED' &&
                                        <ActionIcon size={'xl'} color={'green'} variant={'light'} radius={'xl'}>
                                            <Check/>
                                        </ActionIcon>
                                        }
                                        <Group direction={'column'} spacing={0}>
                                            {/*//@ts-ignore*/}
                                            <Text>{sellers && sellers.watchedObject && sellers.watchedObject?.filter((ell)=> el?.sellerUid === ell?.uuid)[0]?.legalEntityName || ""}</Text>
                                            <Text size={'sm'} color={'gray'}>{el?.totalPrice} жемчужин</Text>
                                            <Text size={'xs'} color={'gray'}>{el?.createdAt}</Text>
                                        </Group>
                                    </Group>
                                    <Group spacing={5}>
                                        {el?.status === 'PLACED' &&
                                        <ActionIcon size={'xl'} color={'orange'} variant={'light'} onClick={(event:any) =>{
                                            event.stopPropagation()
                                            setQr(true)
                                        }
                                        }>
                                            <Wallet />
                                        </ActionIcon>
                                        }
                                        {el?.status ==='CANCELLED' &&
                                        <ActionIcon size={'xl'}>
                                            <ChevronRight size={'lg'}/>
                                        </ActionIcon>}
                                        {el?.status === 'FINISHED' &&
                                        <Group spacing={5}>
                                            <ActionIcon size={'xl'} color={'red'} variant={'filled'}>
                                                <AlertCircle/>
                                            </ActionIcon>
                                            <ActionIcon size={'xl'} color={'orange'} variant={'filled'}>
                                                <Pencil/>
                                            </ActionIcon>
                                        </Group>
                                        }
                                    </Group>
                                </Group>
                            </Paper>
                        )
                    })
                    || <Center><Loader/></Center>
                    }

                </Group>

                {/*<Title pt={15} pb={5} order={3}>История заказов </Title>*/}
                {/*//@ts-ignore*/}
                {/*{orders && orders.watchedObject && console.log(orders.watchedObject.filter((el) => el.buyerUid === userStatus.uuid))}*/}
                {/*{orders && orders.watchedObject && orders.watchedObject.filter((el) => el?.buyerUid === userStatus.uuid).map((el) => {*/}
                {/*    return (*/}
                {/*        <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}} onClick={() =>{*/}
                {/*            if (el) setDrawerOrder(el)*/}
                {/*            console.log(el)*/}
                {/*            setOpen(true)}}*/}
                {/*        >*/}
                {/*            <Group position={'apart'}>*/}
                {/*                <Group spacing={10}>*/}
                {/*                    {el?.status === 'PLACED' &&*/}
                {/*                        <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>*/}
                {/*                        <Rotate2/>*/}
                {/*                    </ActionIcon>*/}
                {/*                    }*/}
                {/*                    {el?.status ==='CANCELLED' &&*/}
                {/*                        <ActionIcon size={'xl'} color={'gray'} variant={'filled'} radius={'xl'}>*/}
                {/*                            <X/>*/}
                {/*                        </ActionIcon>}*/}
                {/*                    {el?.status === 'FINISHED' &&*/}
                {/*                        <ActionIcon size={'xl'} color={'green'} variant={'filled'} radius={'xl'}>*/}
                {/*                            <Check/>*/}
                {/*                        </ActionIcon>*/}
                {/*                    }*/}
                {/*                    <Group direction={'column'} spacing={0}>*/}
                {/*                        /!*@ts-ignore*!/*/}
                {/*                        <Text>{sellers && sellers.watchedObject && sellers.watchedObject?.filter((ell)=> el?.sellerUid === ell?.uuid)[0]?.legalEntityName || ""}</Text>*/}
                {/*                        <Text size={'sm'} color={'gray'}>{el?.totalPrice} жемчужин</Text>*/}
                {/*                        <Text size={'xs'} color={'gray'}>{el?.createdAt}</Text>*/}
                {/*                    </Group>*/}
                {/*                </Group>*/}
                {/*                <Group spacing={5}>*/}
                {/*                    {el?.status === 'PLACED' &&*/}
                {/*                        <ActionIcon size={'xl'} color={'orange'} variant={'filled'} onClick={(event:any) =>{*/}
                {/*                            event.stopPropagation()*/}
                {/*                            setQr(true)*/}
                {/*                        }*/}
                {/*                            }>*/}
                {/*                            <Wallet />*/}
                {/*                        </ActionIcon>*/}
                {/*                    }*/}
                {/*                    {el?.status ==='CANCELLED' &&*/}
                {/*                        <ActionIcon size={'xl'}>*/}
                {/*                            <ChevronRight size={'lg'}/>*/}
                {/*                        </ActionIcon>}*/}
                {/*                    {el?.status === 'FINISHED' &&*/}
                {/*                        <Group spacing={5}>*/}
                {/*                            <ActionIcon size={'xl'} color={'red'} variant={'filled'}>*/}
                {/*                                <AlertCircle/>*/}
                {/*                            </ActionIcon>*/}
                {/*                            <ActionIcon size={'xl'} color={'orange'} variant={'filled'}>*/}
                {/*                                <Pencil/>*/}
                {/*                            </ActionIcon>*/}
                {/*                        </Group>*/}
                {/*                    }*/}
                {/*                </Group>*/}
                {/*            </Group>*/}
                {/*        </Paper>*/}
                {/*    )*/}
                {/*})*/}
                {/*    || <Center><Loader/></Center>*/}
                {/*}*/}
            </Container>
        </>
    );
}

export default {
    routeProps: {
        path: 'profile',
        exact: true,
        index: false,
        element: <Profile/>,
    },
    name: 'Profile',
};