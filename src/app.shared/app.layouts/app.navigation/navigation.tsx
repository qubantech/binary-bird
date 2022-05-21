import {ActionIcon, Text, Center, Group, Header as MantineHeader, Divider, Paper, Container} from "@mantine/core";
import {Link} from "react-router-dom";
import {AvatarIcon, CameraIcon, CardStackIcon, HomeIcon, PaperPlaneIcon, PersonIcon} from "@radix-ui/react-icons";
import {Beach, ListCheck, ListSearch, ShoppingCart, UserCircle} from "tabler-icons-react";
import {useAppSelector} from "../../../store/createstore";


const Navigation = (props:{children:JSX.Element}) => {

    const ICON_SIZE = { height: 45, width: 45 }
    const userStatus = useAppSelector(state => state.user)

    return(
         <>
             {props.children}
             {userStatus.userInfo && userStatus.userInfo.role === "USER" &&
            <MantineHeader height={55} fixed={true} position={{ bottom: -1, left: 0, right: 0 }}>
                <Container size={'sm'} px={0}>
                <Group grow spacing={0} sx={{height: '55px'}}>
                    <Link to={"/map"}>
                        <Center>
                                <Group position={"center"} direction={'column'} spacing={1}>
                                        <ActionIcon variant={'hover'} size={'md'}>
                                                <Beach style={ICON_SIZE}/>
                                        </ActionIcon>
                                    <Text color={"black"} underline={false} size={"xs"}>Карта</Text>
                                </Group>
                        </Center>
                    </Link>
                    <Link to={"/search"}>
                        <Center>
                            <Group position={"center"} direction={'column'} spacing={1}>
                                <ActionIcon variant={'hover'} size={'md'}>
                                    <ListSearch style={ICON_SIZE}/>
                                </ActionIcon>
                                <Text color={"black"} underline={false} size={"xs"}>Поиск</Text>
                            </Group>
                        </Center>
                    </Link>
                    <Link to={"/profile"}>
                        <Center>
                            <Group position={"center"} direction="column" spacing={1}>
                                <ActionIcon size={'md'}>
                                    <UserCircle style={ICON_SIZE}/>
                                </ActionIcon>
                                <Text color={"black"} underline={false} size={"xs"}>Профиль</Text>
                            </Group>
                        </Center>
                    </Link>
                    <Link style={{position:"absolute", height:"75px", width:"75px", bottom: "3px", right: "7vw"}} to={"/cart"}>
                        <Center>
                            <ActionIcon color="orange"  radius="xl" style={{height:"70px", width:"70px"}} variant="filled">
                                <ShoppingCart style={{ height: 30, width: 30 }} />
                            </ActionIcon>
                        </Center>
                    </Link>
                </Group>
                </Container>
            </MantineHeader>
             }
             {userStatus.userInfo && userStatus.userInfo.role === "SELLER" &&
                 <MantineHeader height={55} fixed={true} position={{ bottom: -1, left: 0, right: 0 }}>
                     <Container size={'sm'} px={0}>
                         <Group grow spacing={0} sx={{height: '55px'}}>
                             <Link to={"/seller_orders"}>
                                 <Center>
                                     <Group position={"center"} direction={'column'} spacing={1}>
                                         <ActionIcon variant={'hover'} size={'md'}>
                                             <ListCheck style={ICON_SIZE}/>
                                         </ActionIcon>
                                         <Text color={"black"} underline={false} size={"xs"}>Заказы</Text>
                                     </Group>
                                 </Center>
                             </Link>
                             <Link to={"/seller_profile"}>
                                 <Center>
                                     <Group position={"center"} direction="column" spacing={1}>
                                         <ActionIcon size={'md'}>
                                             <UserCircle style={ICON_SIZE}/>
                                         </ActionIcon>
                                         <Text color={"black"} underline={false} size={"xs"}>Профиль</Text>
                                     </Group>
                                 </Center>
                             </Link>
                             <Link style={{position:"absolute", height:"75px", width:"75px", bottom: "3px", right: "7vw"}} to={"/scanner"}>
                                 <Center>
                                     <ActionIcon color="orange"  radius="xl" style={{height:"70px", width:"70px"}} variant="filled">
                                         <CameraIcon style={{ height: 30, width: 30 }} />
                                     </ActionIcon>
                                 </Center>
                             </Link>
                         </Group>
                     </Container>
                 </MantineHeader>

             }
         </>
    )

}
export default Navigation;