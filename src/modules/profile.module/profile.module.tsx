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
    Text
} from "@mantine/core";
import Pearl from '../../app.shared/app.images/pearl.svg'
//@ts-ignore
import SBP from '../../app.shared/app.images/sbp.png'
import {CreditCard, ExternalLink} from "tabler-icons-react";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../../app.shared/app.configs";

const Profile = () => {

    const navigate = useNavigate()

    const logout = () => {
        signOut(auth);
        navigate("/")
    }

    return (
        <>
            <AppHeader title={<Select
                variant={'unstyled'}
                placeholder="Выберите пляж"
                data={[
                    {value: 'react', label: 'Центральный пляж'},
                    {value: 'ng', label: 'Angular'},
                    {value: 'svelte', label: 'Svelte'},
                    {value: 'vue', label: 'Vue'},
                ]}
                defaultValue={'react'}
            />}/>
            <Container pt={65}>
                <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}} onClick={()=> logout()}>
                    <Group align={'start'}>
                        <Avatar size={65}>
                            s
                        </Avatar>
                        <Group direction={'column'} spacing={10}>
                            <Text weight={600} size={'xl'}>
                                Имя Фамилия
                            </Text>
                            <Text>
                                +65567890
                            </Text>
                        </Group>
                    </Group>
                </Paper>
                <Grid pt={10}>
                    <Grid.Col span={6}>
                        <Paper shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                            <Text>На балансе:</Text>
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
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
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
                    </Grid.Col>

                </Grid>
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