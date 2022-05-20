import {Header as MantineHeader} from "@mantine/core";
import {ActionIcon, Center, Container, Group, Text} from "@mantine/core";
import {Bell, Cloud} from "tabler-icons-react";

export const AppHeader = (props:{title:JSX.Element}) => {
    return(
        <>
            <MantineHeader height={55} fixed={true} position={{ top: -1, left: 0, right: 0 }}>
                <Container size={'sm'} style={{height:'55px'}}>
                   <Group py={10} align={'center'} position={'apart'}>
                       {props.title}
                       <Group position={'right'}>
                           <Group spacing={5}>
                              <Cloud size={35}/>
                               <Text>+18°C</Text>
                           </Group>
                           <ActionIcon size={35}>
                               <Bell size={35}/>
                           </ActionIcon>
                       </Group>
                   </Group>
                </Container>
            </MantineHeader>
        </>
    )
}