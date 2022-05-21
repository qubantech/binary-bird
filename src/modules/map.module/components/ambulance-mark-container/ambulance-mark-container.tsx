import React, {FC, useState} from 'react';
import {Placemark} from "react-yandex-maps";

import ambulanceMark from './../../assets/ambulance-mark.svg'
import {Drawer, Text} from "@mantine/core";
import PointDrawerContent from "../point-drawer-content";

interface AmbulanceMarkContainerProps {
    geometry: number[],
    onEventClick: any,
    ambulance: any
}

const AmbulanceMarkContainer: FC<AmbulanceMarkContainerProps> = ({
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
                iconImageHref: ambulanceMark,
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
                    onEventClick(obj.properties._data)
                })}
           />
        </>
    );
};

export default AmbulanceMarkContainer;