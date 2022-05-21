import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Text, Image, Group, Paper, Grid, Center, Progress} from "@mantine/core";
import beach from "./beach.jpg"
import flag from "./flag.png"
import jelly from "./jellyfish.svg"
import dolphin from "./dolphin.svg"
import {Cloud, Fish, Ripple, Wind, Woman} from "tabler-icons-react";

const WeatherModule = () => {

    return (
        <>
            <AppHeader title={<Text size={'lg'}>Погодные условия</Text>}/>
            <Container my={65}>
                <Image radius={'sm'} src={beach}/>
                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Text mb={10} size={'lg'}>Погода</Text>
                    <Grid>
                        <Grid.Col span={4}>
                            <Center>
                                <Cloud style={{height:'100%', width:"10vw"}}/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Text weight={700}>+18°C</Text>
                            <Text>Переменная облачность</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Center>
                                <Ripple style={{height:'100%', width:"9vw"}}/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={4}>
                                <Text weight={700}>+13°C</Text>
                                <Text size={'xs'}> температура воды</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Center>
                                <Wind style={{height:'100%', width:"9vw"}}/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Text weight={700}> 5 м/с</Text>
                            <Text size={'xs'}> северо-восточный</Text>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Text mb={10} size={'lg'}>Состояние моря</Text>
                    <Grid>
                        <Grid.Col span={3}>
                         <Image sx={{width:'20vw', backgroundColor: "#FFF4E6"}} src={flag}/>
                        </Grid.Col>
                        <Grid.Col span={9}>
                        <Text pt={5} inline>Нужно быть осторожными – на пляже умеренные волны или есть подводные течения.
                            На пляже дежурят спасатели.</Text>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Text mb={10} size={'lg'}>Статистика</Text>
                    <Grid>
                        <Grid.Col span={2}>
                            <Center>
                                <Image src={jelly} style={{height:'100%', width:"8vw"}}/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            {/*<Group spacing={0}>*/}
                                <Text weight={700}>Медузы 6,3</Text>
                                <Progress
                                    mr={10}
                                    mt={3}
                                    size="md"
                                    radius="md"
                                    value={25}
                                />
                            {/*</Group>*/}
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Center>
                                <Image src={dolphin} style={{height:'100%', width:"8vw"}}/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={4}>
                                <Text weight={700}> 8 м/с</Text>
                                <Text size={'xs'}> Северо-восточный</Text>
                        </Grid.Col>
                    </Grid>
                </Paper>
                <Paper my={10} shadow={'md'} p={'md'} sx={{backgroundColor: "#FFF4E6"}}>
                    <Text mb={10} size={'lg'}>Девушки на пляже</Text>
                    <Progress
                        mt="md"
                        size="xl"
                        radius="xl"
                        sections={[
                            { value: 70, color: 'green', label: 'Красивые' },
                            { value: 30, color: 'orange', label: 'Умные' },
                        ]}
                    />
                </Paper>
            </Container>
        </>
    )
}

export default {
    routeProps: {
        path: 'weather',
        exact: true,
        index: false,
        element: <WeatherModule/>,
    },
    name: 'Weather',
};