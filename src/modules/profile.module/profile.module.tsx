import React from 'react';
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Avatar, Container, Group, Image, Paper, Select, Text} from "@mantine/core";
import Pearl from '../../app.shared/app.images/pearl.svg'

const Profile = () => {

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
                <Paper shadow={'md'} p={'md'}>
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
                <Paper my={10} shadow={'md'} p={'md'}>
                    <Image src={Pearl} style={{height:45, width:45}}/>
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