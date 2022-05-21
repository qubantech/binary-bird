import {Header as MantineHeader, Indicator} from "@mantine/core";
import {ActionIcon, Center, Container, Group, Text} from "@mantine/core";
import {Bell, Cloud} from "tabler-icons-react";
import {useNavigate} from "react-router-dom";

export const AppHeader = (props:{title:JSX.Element}) => {
    const navigate = useNavigate()

    return(
        <>
            <MantineHeader height={55} fixed={true} position={{ top: -1, left: 0, right: 0 }}>
                <Container size={'sm'} style={{height:'55px'}}>
                   <Group py={10} align={'center'} position={'apart'}>
                       {props.title}
                       <Group position={'right'} spacing={ 25 }>
                           <Group spacing={5}>
                              <Cloud size={30} color={ 'black' }/>
                               <Text>+18°C</Text>
                           </Group>
                           <ActionIcon  onClick={()=> navigate('/notifications')}>
                               <Indicator color="orange" label={"1"} size={ 15 } >
                                <Bell size={30} color={ 'black' }/>
                               </Indicator>
                           </ActionIcon>
                       </Group>
                   </Group>
                </Container>
            </MantineHeader>
        </>
    )
}