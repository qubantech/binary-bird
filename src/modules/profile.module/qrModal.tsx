import {Center, Group, Modal, Text} from "@mantine/core";
import QRCode from "react-qr-code";
import React from "react";

export const QrModal = (props:{isOpen:boolean, setOpen: (b:boolean) => void, uid:string}) => {
    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={()=>props.setOpen(false)}
            title={ <Text size={'lg'}>QR-код для идентификации</Text>}
        >
            <Text my={20}>Покажите код обслуживающему персоналу для получения товара или услуг</Text>
            <Center>
                <QRCode value={props.uid}/>
            </Center>

        </Modal>
    )
}