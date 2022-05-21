import React, {FC, useState} from 'react';
import {Container, Group, Select} from "@mantine/core";

interface FiltersContainerProps {
    setObjectManagerFilter: any
}

const FiltersContainer: FC<FiltersContainerProps> = ({
                                                         setObjectManagerFilter
                                                     }) => {
    const [filterDrinks, setFilterDrinks] = useState([
        { value: '', label: 'Все напитки' },
        { value: '0', label: '12345678901234567890' },
        { value: '1', label: 'Квас' },
    ])
    const [filterFood, setFilterFood] = useState([
        { value: '', label: 'Вся еда' },
        { value: '0', label: 'Кукуруза' },
        { value: '1', label: 'Пирожки' },
    ])
    const [filterSellers, setFilterSellers] = useState([
        { value: '', label: 'Все продавцы' },
        { value: 'false', label: 'Лавки' },
        { value: 'true', label: 'Кочевники' },
    ])

    const [food, setFood] = useState('')
    const [drink, setDrink] = useState('')
    const [seller, setSeller] = useState('')

    // const updateObjectManagerFilter = () => (object:any) => {
    //     const isFood = food === '' || object.properties.food === food
    //     const isDrinks = drink === '' || object.properties.drink === drink
    //     const isSellers = seller === '' || object.properties.seller === seller
    //     return (isFood || isDrinks) && isSellers
    // }

    const onFoodChange = (food: string) => {
        setObjectManagerFilter(() => (object:any) => {
            const isFood = food === '' || object.properties.food === food
            const isDrinks = drink === '' || object.properties.drink === drink
            const isSellers = seller === '' || object.properties.seller === seller
            return (isFood || isDrinks) && isSellers
        })
        setFood(food)
    }

    const onDrinksChange = (drink: string) => {
        setObjectManagerFilter(() => (object:any) => {
            const isFood = food === '' || object.properties.food === food
            const isDrinks = drink === '' || object.properties.drink === drink
            const isSellers = seller === '' || object.properties.seller === seller
            return (isFood || isDrinks) && isSellers
        })
        setDrink(drink)
    }

    const onSellerChange = (seller: string) => {
        setObjectManagerFilter(() => (object:any) => {
            const isFood = food === '' || object.properties.food === food
            const isDrinks = drink === '' || object.properties.drink === drink
            const isSellers = seller === '' || object.properties.seller.dynamic.toString() === seller
            return (isFood || isDrinks) && isSellers
        })
        setSeller(seller)
    }

    return (
        <Container
            sx={{
                position: 'absolute',
                zIndex: 500,
                backgroundColor: '#FFFFFF',
                padding: '20px',
                marginTop: '54px',
                // left: 0,
                // right: 0,
                // marginLeft: 'auto',
                // marginRight: 'auto',
                // boxShadow: '0px 10px 15px darkGrey',
                // border: '1.11343px solid #EAEBEF',
                borderRadius: '0 0 10px 10px',
                boxShadow: '-10px 4px 20px rgba(48, 48, 48, 0.1)',
                top: 0,
                left: 0,
                right: 0,
            }}
        >
            <Group position={ 'apart' }>
                <Select
                    // label='Еда'
                    placeholder='Вся еда'
                    zIndex={600}
                    sx={{ marginBottom: '10px', width: '47%'}}
                    value={ food }
                    //@ts-ignore
                    onChange={ onFoodChange }
                    data={ filterFood }
                    width={'100px'}
                    size={ 'md' }
                />
                <Select
                    // label='Напитки'
                    placeholder='Все напитки'
                    sx={{ marginBottom: '10px',  width: '47%'}}
                    zIndex={600}
                    value={ drink }
                    //@ts-ignore
                    onChange={ onDrinksChange }
                    data={ filterDrinks }
                    size={ 'md' }
                />
            </Group>

            <Select
                // label='Продавцы'
                placeholder='Все продавцы'
                // sx={{width: '130px'}}
                zIndex={600}
                value={ seller }
                //@ts-ignore
                onChange={ onSellerChange }
                data={ filterSellers }
                size={ 'md' }
            />

        </Container>
    );
};

export default FiltersContainer;