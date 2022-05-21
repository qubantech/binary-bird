import React, {useState} from 'react';
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
    ArrowRight,
    Check, ChevronRight,
    CreditCard, Cross,
    ExternalLink,
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

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Профиль</Text>}/>
            <Container py={65}>
                <MyDrawer order={drawerOrder} isOpen={isOpen} setOpen={setOpen}/>
                <QrModal isOpen={isQr} setOpen={setQr} uid={userStatus.uuid || ""}/>
                <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}} onClick={() => logout()}>
                    <Group position={'apart'}>
                        <Group align={'start'}>
                            <Avatar size={65}>
                                s
                            </Avatar>
                            <Group direction={'column'} spacing={10}>
                                <Text weight={600} size={'xl'}>
                                    {userStatus.userInfo.firstname || "Имя"} {userStatus.userInfo.lastname || 'Фамилия'}
                                </Text>
                                <Text>
                                    {userStatus.userInfo.phone || "phone number"}
                                </Text>
                            </Group>
                        </Group>
                    </Group>
                </Paper>
                <Paper mt={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Group px={10} position={'apart'}>
                    <Group pt={5} align={'center'} spacing={5}>
                        <Image src={Pearl} mr={15} style={{height: 40, width: 40}}/>
                        <Group direction={'column'} spacing={0}>
                            <Group spacing={7}>
                                <Text size={'xl'} weight={700}>156</Text>
                                <Text>жемчужин</Text>
                            </Group>

                            <Text color={'gray'} size={'sm'}>(заморожено 25)</Text>
                        </Group>
                    </Group>
                        <Group spacing={10}>
                        <ActionIcon onClick={() => setQr(true)} color={'orange'} variant={'filled'} size={50}>
                            <Qrcode size={'xl'}/>
                        </ActionIcon>
                        </Group>
                    </Group>
                </Paper>
                <Paper mt={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Group pb={5} grow>
                        <SegmentedControl
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
                    </Group>
                    <Button mt={5} size={'lg'} fullWidth>Пополнить</Button>
                </Paper>
                <Title pt={15} pb={5} order={3}>История заказов </Title>
                {/*//@ts-ignore*/}
                {orders && orders.watchedObject && console.log(orders.watchedObject.filter((el) => el.buyerUid === userStatus.uuid))}
                {orders && orders.watchedObject && orders.watchedObject.filter((el) => el?.buyerUid === userStatus.uuid).map((el) => {
                    return (
                        <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                            <Group position={'apart'}>
                                <Group spacing={10}>
                                    {el?.status === 'PLACED' &&
                                        <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>
                                        <Rotate2/>
                                    </ActionIcon>
                                    }
                                    {el?.status ==='CANCELLED' &&
                                        <ActionIcon size={'xl'} color={'gray'} variant={'filled'} radius={'xl'}>
                                            <X/>
                                        </ActionIcon>}
                                    {el?.status === 'FINISHED' &&
                                        <ActionIcon size={'xl'} color={'green'} variant={'filled'} radius={'xl'}>
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
                                        <ActionIcon size={'xl'} color={'orange'} variant={'filled'} onClick={() => setOpen(true)}>
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