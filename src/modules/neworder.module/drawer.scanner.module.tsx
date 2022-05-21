import {Drawer, Text} from "@mantine/core";
import Scanner from "../camera.module/html5qrcomponents/scanner";
import React from "react";

export const DrawerScannerModule = (props:{isOpen: boolean, setOpen: (b:boolean) => void, setUid: (s:string) => void, sellerName:string}) => {
    return (
        <Drawer
            padding="xl"
            lockScroll
            size="90%"
            position="bottom"
            zIndex={700}
            opened={props.isOpen}
            onClose={() => props.setOpen(false)}>
            <Text align={'center'} color={'black'} weight={700} size={'xl'} mx={15} my={15}>{props.sellerName}</Text>
                <Scanner setOpen={props.setOpen} setUid={props.setUid}/>
        </Drawer>
    )
}