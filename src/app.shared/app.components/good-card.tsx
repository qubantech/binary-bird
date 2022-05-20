import React, {FC, useState} from 'react';
import {Good} from "../app.models/models";
import {Image, Group, Text, Button} from "@mantine/core";

interface GoodCardProps {
    good: Good
}

const GoodCard: FC<GoodCardProps> = ({good}) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false)


    return (
        <Group position={ 'apart' } mt={ '20px' } sx={{
            backgroundColor: '#F8F9FA',
            padding: '5px 15px',
            border: '1px solid #EAEBEF',
            borderRadius: '6px',
        }}>
            <Group>
                <Image
                    radius='md'
                    src='https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                    alt='no image here'
                    width={ 100 }
                    height={ 100 }
                    fit='contain'
                />
                <Group direction={ 'column' } spacing={ 0 }>
                    <Text size={ 'md' }> { good.name } </Text>
                    <Text size={ 'md' }> { good.description } </Text>
                </Group>
            </Group>
            {
                isAddedToCart ?
                    <Button fullWidth size={ 'md' } onClick={ () => setIsAddedToCart(!isAddedToCart) }>В корзине</Button>
                :
                    <Button fullWidth size={ 'md' } variant={ 'outline' } onClick={ () => setIsAddedToCart(!isAddedToCart) }> { good.price }₽</Button>
            }

        </Group>
    );
};

export default GoodCard;