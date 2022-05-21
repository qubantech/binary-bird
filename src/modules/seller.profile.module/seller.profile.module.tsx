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
    Text, TextInput, Title
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
import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip, buildChartTheme,
} from '@visx/xychart'
import {curveBasis, curveNatural} from '@visx/curve'

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

    const customTheme = buildChartTheme({
        backgroundColor: '#FFFFFF',
        colors: ['#E8590C'],
        tickLength: 10,
        gridColor: '#E8EDF0',
        gridColorDark: '#E8EDF0' // used for axis baseline if x/yxAxisLineStyles not set
    })

    const data1 = [
        {x: '2022-05-09', y: 4000},
        {x: '2022-05-10', y: 4500},
        {x: '2022-05-11', y: 0},
        {x: '2022-05-12', y: 0},
        {x: '2022-05-13', y: 5100},
        {x: '2022-05-14', y: 4900},
        {x: '2022-05-15', y: 4700},
        {x: '2022-05-16', y: 3900},
        {x: '2022-05-17', y: 3600},
        {x: '2022-05-18', y: 4200},
        {x: '2022-05-19', y: 0},
        {x: '2022-05-20', y: 0},
        {x: '2022-05-21', y: 7000},
        {x: '2022-05-22', y: 5300},
        {x: '2022-05-23', y: 6100},
    ]

    const accessors = {
        //@ts-ignore
        xAccessor: d => d.x,
        //@ts-ignore
        yAccessor: d => d.y,
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

                <Title pt={25} order={3}>Статистика </Title>
                <Group pt={3}><Text>За период</Text><TextInput sx={{width:'86px'}} size={'xs'} value={"09-05-2022"}/>-<TextInput sx={{width:'86px'}} size={'xs'} value={'23-05-2022'}/></Group>
                <XYChart height={300} theme={customTheme} xScale={{type: 'band'}} yScale={{type: 'linear'}}>
                    <AnimatedAxis numTicks={5} orientation="bottom"/>
                    <AnimatedAxis numTicks={5} orientation="right"/>
                    <AnimatedAxis numTicks={5} orientation={'left'}/>
                    <AnimatedGrid rows={false} numTicks={30}/>
                    <AnimatedLineSeries color={'#67BD63'} curve={curveBasis} dataKey="План работы"
                                        data={data1} {...accessors} />
                    <Tooltip
                        snapTooltipToDatumX
                        snapTooltipToDatumY
                        showVerticalCrosshair
                        showSeriesGlyphs
                        renderTooltip={({tooltipData, colorScale}) => (
                            <div>
                                {/*//@ts-ignore*/}
                                <div style={{color: colorScale(tooltipData.nearestDatum.key)}}>
                                    {/*//@ts-ignore*/}
                                    {tooltipData.nearestDatum.key}
                                </div>
                                {/*//@ts-ignore*/}
                                {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                                {/*//@ts-ignore*/}
                                ({accessors.xAccessor(tooltipData.nearestDatum.datum)})
                            </div>
                        )}
                    />
                </XYChart>
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