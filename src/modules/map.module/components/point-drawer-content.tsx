import React, {FC} from 'react';
import {Seller} from "../../../app.shared/app.models/models";
import {Avatar, Badge, Button, Group, Text} from '@mantine/core'
import GoodCard from "../../../app.shared/app.components/good-card";

interface PointDrawerContentProps {
    seller: Seller
}

const PointDrawerContent: FC<PointDrawerContentProps> = ({seller}) => {
    return (
        <>
            <Group>
                {
                    seller.dynamic ?
                        <Badge size={ 'lg' }>Бродяга</Badge>
                        :
                        <Badge size={ 'lg' }>Лавка</Badge>
                }
                <Text size={ 'sm' }>
                    {seller.workTime}
                </Text>
            </Group>
            <Group position={ 'apart' } mt={ '20px' } sx={{
                backgroundColor: '#F8F9FA',
                padding: '5px 15px',
                border: '1px solid #EAEBEF',
                borderRadius: '6px',
            }}>
                <Group>
                    <Avatar src={null} alt="no image here" size={ 'md' } />
                    <Group direction={ 'column' } spacing={ 0 }>
                        <Text size={ 'md' }> { seller.cashier.firstname } </Text>
                        <Text size={ 'md' }> { seller.cashier.lastname } </Text>
                    </Group>
                </Group>
                <Text size={ 'md' }> { seller.phone } </Text>
            </Group>
            <Group spacing={ 3 } mt={ '20px' }>
                {
                    seller.tags.map((tag:string) => {
                        return (
                            <Badge color={ 'yellow' }  size={ 'lg' }> { tag } </Badge>
                        )
                    })
                }
            </Group>
            {
                seller.goods.map((good) => {
                    return (
                        <GoodCard good={ good }/>
                    )
                })
            }
            <Button fullWidth size={ 'lg' } mt={ '20px' }>Посмотреть все товары</Button>
        </>
    );
};

export default PointDrawerContent;