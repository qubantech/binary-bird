import React from 'react';
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {
    ActionIcon,
    Avatar, Box, Button,
    Center,
    Container,
    Grid,
    Group,
    Image,
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
    CreditCard,
    ExternalLink,
    Pencil,
    Report,
    Rotate2,
    Ticket
} from "tabler-icons-react";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../../app.shared/app.configs";
import {useAppDispatch, useAppSelector} from "../../store/createstore";
import {setUser, setUUID} from "../../store/user.store/user-action-creators";
import {initStateUser} from "../../store/user.store/user-reducer";

const Profile = () => {

    const navigate = useNavigate()
    const userStatus = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const logout = () => {
        signOut(auth);
        dispatch(setUser(initStateUser))
        dispatch(setUUID(""))
        navigate("/")
    }

    return (
        <>
            <AppHeader title={<Text>Профиль</Text>}/>
            <Container pt={65}>
                <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}} onClick={() => logout()}>
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
                </Paper>
                <Paper mt={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Group px={10} position={'apart'}>
                    <Group pt={5} align={'center'} spacing={5}>
                        <Image src={Pearl} mr={15} style={{height: 40, width: 40}}/>
                        <Group direction={'column'} spacing={0}>
                            <Group>
                                <Text size={'xl'} weight={700}>156</Text>
                                <Text>жемчужин</Text>
                            </Group>

                            <Text color={'gray'} size={'sm'}>(заморожено 25)</Text>
                        </Group>
                    </Group>
                        <ActionIcon size={'lg'}>
                            <Ticket size={'md'}/>
                        </ActionIcon>
                    </Group>
                </Paper>
                <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Group pb={5} grow>
                        <SegmentedControl
                            data={[
                                {
                                    value: 'preview',
                                    label: (
                                        <Center>
                                            <Image style={{height: 20, width: 17}} src={SBP}></Image>
                                            <Box ml={10}>СБП</Box>
                                        </Center>
                                    ),
                                },
                                {
                                    value: 'code',
                                    label: (
                                        <Center>
                                            <CreditCard size={20}/>
                                            <Box ml={10}>Карта</Box>
                                        </Center>
                                    ),
                                },
                            ]}
                        />
                    </Group>
                    <Button mt={5} fullWidth>Пополнить</Button>
                </Paper>
                <Title py={15} order={3}>История заказов </Title>


                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
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
                            <ActionIcon size={'lg'} color={'red'} variant={'filled'}>
                                <AlertCircle/>
                            </ActionIcon>
                            <ActionIcon size={'lg'} color={'orange'} variant={'filled'}>
                                <Pencil/>
                            </ActionIcon>
                        </Group>
                    </Group>
                </Paper>


                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
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