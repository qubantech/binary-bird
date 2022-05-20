import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {ActionIcon, Badge, Button, Card, Container, Group, Text} from "@mantine/core";
import {InfoCircle} from "tabler-icons-react";

const NotificationModule = () => {
    return(
        <>
            <AppHeader title={<Text>Уведомления</Text>}/>
            <Container mt={55}>
                <Card my={10} style={{ background: '#FFF4E6', cursor: 'pointer' }}>
                    <Group>
                        <ActionIcon color={'blue'} size={'xl'}>
                            <InfoCircle size={'lg'}/>
                        </ActionIcon>
                        <Group direction={'column'} spacing={1}>
                        <Text size={'md'} style={{ lineHeight: '1.4' }}>заголовок</Text>
                        <Text size={'sm'} style={{ lineHeight: '1.1' }} mt={'xs'}>описание</Text>
                        <Text size={'sm'} style={{ lineHeight: '1.4' }} mt={'xs'}>
                            <Badge>
                                время
                            </Badge>
                        </Text>
                        </Group>
                    </Group>
                </Card>


                <Button my={10} color={'red'} fullWidth size={'xl'}>
                    <Group spacing={0} direction={'column'} align={'center'}>
                        <Text>SOS
                        </Text>
                        <Text size={'xs'}>Только при острой необходимости и опасности для жизни</Text>
                    </Group>
                </Button>
            </Container>
        </>
    )
}

export default {
    routeProps: {
        path: 'notifications',
        exact: true,
        index: false,
        element: <NotificationModule/>,
    },
    name: 'Notifications',
};