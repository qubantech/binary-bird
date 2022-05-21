import React, {useEffect, useState} from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {
    ActionIcon,
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Group,
    Image,
    Paper,
    SegmentedControl,
    Text, Title
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import {signOut} from "firebase/auth";
import {auth} from "../../app.shared/app.configs";
import {setUser, setUUID} from "../../store/user.store/user-action-creators";
import {initStateUser} from "../../store/user.store/user-reducer";
import Pearl from "../../app.shared/app.images/pearl.svg";
import {
    AlertCircle,
    ChartBubble,
    Check,
    ChevronRight,
    CreditCard,
    Logout,
    Pencil,
    Qrcode,
    Rotate2
} from "tabler-icons-react";

import SBP from "../../app.shared/app.images/sbp.png";
import {transactionsService} from "../../app.shared/app.services/app.transactions.service";
import {useOrdersList} from "../../app.shared/app.services/app.order.service";

const SellerProfileModule = () => {
    const navigate = useNavigate()
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [balance, setBalance] = useState(0)
    const orders = useOrdersList()

    useEffect(() => {
        transactionsService.getUserBalance(userStatus.uuid)
            .then((resp)=>{
                console.log(resp)
                setBalance(resp.data.value)
            })
    },[])

    const logout = () => {
        signOut(auth);
        dispatch(setUser(initStateUser))
        dispatch(setUUID(""))
        navigate("/")
    }

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Профиль продавца</Text>}/>
            <Container mt={65}>

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

                <Group spacing={ 8 } sx={{marginTop: '-50px', marginBottom: '30px' }} position={'left'}>
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
                            <Text size={ 'sm' } >Ожидается</Text>
                            <Group spacing={2}>
                                <ActionIcon variant={'transparent'} color={ 'dark' } >
                                    <ChartBubble size={25}/>
                                </ActionIcon>
                                <Text weight={700}>250</Text>
                            </Group>
                        </Group>
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
                {/*        <Group pt={5} align={'center'} spacing={5}>*/}
                {/*            <Image src={Pearl} mr={15} style={{height: 40, width: 40}}/>*/}
                {/*            <Group direction={'column'} spacing={0}>*/}
                {/*                <Group spacing={7}>*/}
                {/*                    <Text size={'xl'} weight={700}>{balance && balance}</Text>*/}
                {/*                    <Text>жемчужин</Text>*/}
                {/*                </Group>*/}
                {/*                <Text color={'gray'} size={'sm'}>(ожидается 250)</Text>*/}
                {/*            </Group>*/}
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

                {/*<Paper mt={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>*/}
                {/*    <Group pb={5} grow>*/}
                {/*        <SegmentedControl*/}
                {/*            data={[*/}
                {/*                {*/}
                {/*                    value: 'preview',*/}
                {/*                    label: (*/}
                {/*                        <Center>*/}
                {/*                            <Image style={{height: 23, width: 20}} src={SBP}></Image>*/}
                {/*                            <Box ml={10}><Text size={'lg'}>СБП</Text></Box>*/}
                {/*                        </Center>*/}
                {/*                    ),*/}
                {/*                },*/}
                {/*                {*/}
                {/*                    value: 'code',*/}
                {/*                    label: (*/}
                {/*                        <Center>*/}
                {/*                            <CreditCard size={23}/>*/}
                {/*                            <Box ml={10}><Text size={'lg'}>Карта</Text></Box>*/}
                {/*                        </Center>*/}
                {/*                    ),*/}
                {/*                },*/}
                {/*            ]}*/}
                {/*        />*/}
                {/*    </Group>*/}
                {/*    <Button mt={5} size={'lg'} fullWidth>Вывести</Button>*/}
                {/*</Paper>*/}

                <Group spacing={ 10 } direction={ 'column' } sx={{backgroundColor: '#F1F3F5', width: '100vw', margin: '0 0 0 -16px', padding: '0 20px 40px 20px'}} >
                    <Text size={ 'xs' } weight={700} transform="uppercase" sx={{color: '#5C5F66', padding: '20px 0 0 0'}}>История заказов</Text>
                    <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#ffffff", width: '100%'}} >
                        <Group position={'apart'}>
                            <Group spacing={10}>
                                <ActionIcon size={'xl'} color={'green'} variant={'filled'} radius={'xl'}>
                                    <Check/>
                                </ActionIcon>
                                <Group direction={'column'} spacing={1}>
                                    <Text>Имя продавца</Text>
                                    <Text size={'sm'} color={'gray'}>время</Text>
                                </Group>
                            </Group>
                            <Group spacing={5}>
                                <ActionIcon size={'xl'} color={'red'} variant={'filled'}>
                                    <AlertCircle/>
                                </ActionIcon>
                                <ActionIcon size={'xl'} color={'orange'} variant={'filled'}>
                                    <Pencil/>
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Paper>
                    <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#ffffff", width: '100%'}} >
                        <Group position={'apart'}>
                            <Group spacing={10}>
                                <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>
                                    <Rotate2/>
                                </ActionIcon>
                                <Group direction={'column'} spacing={1}>
                                    <Text>Имя продавца</Text>
                                    <Text size={'sm'} color={'gray'}>время</Text>
                                </Group>
                            </Group>
                            <Group spacing={5}>
                                <ActionIcon size={'xl'}>
                                    <ChevronRight size={'lg'}/>
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Paper>

                </Group>

                {/*<Title py={15} order={3}>История заказов </Title>*/}
                {/*<Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>*/}
                {/*    <Group position={'apart'}>*/}
                {/*        <Group spacing={10}>*/}
                {/*            <ActionIcon size={'xl'} color={'green'} variant={'filled'} radius={'xl'}>*/}
                {/*                <Check/>*/}
                {/*            </ActionIcon>*/}
                {/*            <Group direction={'column'} spacing={1}>*/}
                {/*                <Text>Имя продавца</Text>*/}
                {/*                <Text size={'sm'} color={'gray'}>время</Text>*/}
                {/*            </Group>*/}
                {/*        </Group>*/}
                {/*        <Group spacing={5}>*/}
                {/*            <ActionIcon size={'xl'} color={'red'} variant={'filled'}>*/}
                {/*                <AlertCircle/>*/}
                {/*            </ActionIcon>*/}
                {/*            <ActionIcon size={'xl'} color={'orange'} variant={'filled'}>*/}
                {/*                <Pencil/>*/}
                {/*            </ActionIcon>*/}
                {/*        </Group>*/}
                {/*    </Group>*/}
                {/*</Paper>*/}

                {/*<Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>*/}
                {/*    <Group position={'apart'}>*/}
                {/*        <Group spacing={10}>*/}
                {/*            <ActionIcon size={'xl'} color={'orange'} variant={'filled'} radius={'xl'}>*/}
                {/*                <Rotate2/>*/}
                {/*            </ActionIcon>*/}
                {/*            <Group direction={'column'} spacing={1}>*/}
                {/*                <Text>Имя продавца</Text>*/}
                {/*                <Text size={'sm'} color={'gray'}>время</Text>*/}
                {/*            </Group>*/}
                {/*        </Group>*/}
                {/*        <Group spacing={5}>*/}
                {/*            <ActionIcon size={'xl'}>*/}
                {/*                <ChevronRight size={'lg'}/>*/}
                {/*            </ActionIcon>*/}
                {/*        </Group>*/}
                {/*    </Group>*/}
                {/*</Paper>*/}

            </Container>
        </>
    )
}
export default {
    routeProps: {
        path: 'seller_profile',
        exact: true,
        index: false,
        element: <SellerProfileModule/>,
    },
    name: 'SellerProfile',
};