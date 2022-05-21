import React, {FC, useState} from 'react';
import {Placemark} from "react-yandex-maps";

import adminMark from './../../assets/admin-mark.svg'
import {Drawer, Text} from "@mantine/core";
import PointDrawerContent from "../point-drawer-content";

interface AdminHouseMarkContainerProps {
    geometry: number[],
    onEventClick: any,
    ambulance: any
}

const AdminHouseMarkContainer: FC<AdminHouseMarkContainerProps> = ({
                                                                     geometry,
                                                                       onEventClick,
                                                                     ambulance
                                                                 }) => {

    return (
        <>
            <Placemark
                geometry={ geometry }
                options={{
                    iconLayout: 'default#image',
                    iconImageHref: adminMark,
                    iconImageSize: [70, 90],
                }}
                properties={{
                    ambulance: ambulance
                }}
                //@ts-ignore
                instanceRef={ref =>
                    //@ts-ignore
                    ref?.events.add('click', (e) => {
                        const obj = e.get('target')
                        //@ts-ignore
                        onEventClick(obj.properties._data.ambulance)
                    })}
            />
        </>
    );
};

export default AdminHouseMarkContainer;