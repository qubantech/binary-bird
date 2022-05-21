import React, {FC} from 'react';
import {Text, Image, Group, Badge} from '@mantine/core'
import { Event } from "../../../app.shared/app.models/models";


interface EventDrawerContentProps {
    event: Event
}

const EventDrawerContent: FC<EventDrawerContentProps> = ({
    event
                                                                 }) => {
    return (
        <>
            <Image src={ event.photoUrl } height={220} alt="Norway" radius={ 'md' }/>
            <Group mt={ '20px' } sx={{
                backgroundColor: '#F8F9FA',
                padding: '5px 15px',
                border: '1px solid #EAEBEF',
                borderRadius: '6px',
            }}>
                <Group direction={ 'column' } spacing={ 5 }>
                    <Text weight={ 600 } size={ 'lg' }> { event.name } </Text>
                    <Badge size={ 'md' }> { event.time } </Badge>
                </Group>
            <Text mt={ '10px' } sx={{color: '#373A40', lineHeight: 1.5}}> { event.description } </Text>
            </Group>
        </>
    );
};

export default EventDrawerContent;