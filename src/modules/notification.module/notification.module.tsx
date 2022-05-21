import React from "react";
import { AppHeader } from "../../app.shared/app.layouts/app.navigation/header";
import { ActionIcon, Badge, Button, Card, Container, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const NotificationModule = () => {

    const navigate = useNavigate()

    const NotificationCard = ({
                                  title,
                                  description,
                                  badgeText,
                                  link
                              }: {
        title: string,
        description: string,
        badgeText: string,
        link: string
    }) => {

        const onClick = () => {
            navigate(link)
        }

        return <Card my={10} style={{ background: '#FFF4E6', cursor: 'pointer' }} onClick={onClick}>
            <Grid columns={9}>
                <Grid.Col span={7}>
                    <Text size={'md'} style={{ lineHeight: '1.2', fontWeight: 700, color: '#3a3a3a' }}>{title}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                        <Text size={'xs'} style={{ fontWeight: 500 }}>
                            {badgeText}
                        </Text>
                    </Badge>
                </Grid.Col>
            </Grid>
            <Text size={'md'} style={{ lineHeight: '1.1', color: '#3a3a3a' }} mt={'xs'}>{description}</Text>
        </Card>
    }

    const MOCK_DATA = [
        {
            title: `Событие "Водная заруба" начнётся через 30 минут`,
            description: `Через 30 минут на пляже, где вы находитесь, начнётся событие "Водная заруба", поторопитесь!`,
            badgeText: `Событие`,
            link: ``
        },
        {
            title: `Завтра погода будет хорошей`,
            description: `Не забудьте плавки.`,
            badgeText: `Погода`,
            link: ``
        },
        {
            title: `Внесено 1500 жемчужин`,
            description: `Ваш счёт в приложении пополнен. Внесено 1500 жемчужин.`,
            badgeText: `Событие`,
            link: ``
        },
    ]

    return (
        <>
            <AppHeader title={<Text>Уведомления</Text>}/>
            <Container mt={65}>
                <Button fullWidth size={'lg'} my={10} color={'red'}>
                    <Group spacing={0} direction={'column'} align={'center'}>
                        <Text size={'xl'}>
                            Срочная помощь
                        </Text>
                    </Group>
                </Button>
                {MOCK_DATA.map(data => <NotificationCard {...data}/>)}
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