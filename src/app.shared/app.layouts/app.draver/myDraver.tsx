import {Drawer, Text} from "@mantine/core";
import PointDrawerContent from "../../../modules/map.module/components/point-drawer-content";
import React, {useState} from "react";
import {Order} from "../../app.models/models";

export const MyDrawer = (props:{ order:Order, isOpen:boolean, setOpen:(b:boolean) => void}) => {
    return (
        <Drawer
            lockScroll={ false }
            opened={props.isOpen}
            onClose={() => props.setOpen(false)}
            title={
                <Text size={ 'sm' }>
                    Номер заказа
                </Text>
            }
            padding="xl"
            size="70%"
            position="bottom"
            zIndex={700}
        >
            <Text size={'lg'}>
                Название места
            </Text>
            <Text size={'xs'} color={'gray'}>
               Время
            </Text>
        </Drawer>
    )
}