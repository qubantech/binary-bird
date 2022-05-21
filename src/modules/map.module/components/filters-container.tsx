import React, {FC, useEffect, useState} from 'react';
import {Container, Group, SegmentedControl, Select} from "@mantine/core";

interface FiltersContainerProps {
    setObjectManagerFilter: any,
    tags: any
}

const FiltersContainer: FC<FiltersContainerProps> = ({
                                                         setObjectManagerFilter,
                                                         tags
                                                     }) => {
    const [mapContent, setMapContent] = useState('seller');

    const [filterDrinks, setFilterDrinks] = useState([
        { value: '', label: 'Все напитки' },
        { value: '0', label: '12345678901234567890' },
        { value: '1', label: 'Квас' },
    ])

    const [filterFood, setFilterFood] = useState<any>([
        { value: '', label: 'Вся еда' },
    ])

    const [filterSellers, setFilterSellers] = useState([
        { value: '', label: 'Все продавцы' },
        { value: 'false', label: 'Лавки' },
        { value: 'true', label: 'Странники' },
    ])

    const [food, setFood] = useState('')
    const [drink, setDrink] = useState('')
    const [seller, setSeller] = useState('')

    useEffect(() => {
        if (tags !== undefined) {
            const tempFilterFood = Array.from(tags).map((tag: any) => {
                const label = tag.toString()
                label[0].toUpperCase()
                return {value: tag.toString(), label: label}
            })

            const a = [ { value: '', label: 'Вся еда' }]
            a.push(...tempFilterFood)
            setFilterFood(a)

        }
    }, [tags])

    // const updateObjectManagerFilter = () => (object:any) => {
    //     const isFood = food === '' || object.properties.food === food
    //     const isDrinks = drink === '' || object.properties.drink === drink
    //     const isSellers = seller === '' || object.properties.seller === seller
    //     return (isFood || isDrinks) && isSellers
    // }

    const onFoodChange = (food: string) => {
        setObjectManagerFilter(() => (object:any) => {
            if (object.properties.type == 'seller'){
                const isSellers = seller === '' || object.properties.object.dynamic.toString() === seller
                const isFood = food === '' || object.properties.object.tags.includes(food)
                return isFood && isSellers && object.properties.type == mapContent
            } else return object.properties.type == mapContent
        })
        setFood(food)
    }

    const onDrinksChange = (drink: string) => {
        setObjectManagerFilter(() => (object:any) => {
            const isFood = food === '' || object.properties.food === food
            const isDrinks = drink === '' || object.properties.drink === drink
            const isSellers = seller === '' || object.properties.seller === seller
            return (isFood || isDrinks) && isSellers && object.properties.type == mapContent
        })
        setDrink(drink)
    }

    const onSellerChange = (seller: string) => {
        setObjectManagerFilter(() => (object:any) => {
            if (object.properties.type == 'seller'){
                const isSellers = seller === '' || object.properties.object.dynamic.toString() === seller
                const isFood = food === '' || object.properties.object.tags.includes(food)
                return isFood && isSellers && object.properties.type == mapContent
            } else return object.properties.type == mapContent
        })
        setSeller(seller)
    }

    const onMapContentChange = (mapContent: string) => {
        console.log(mapContent)
        if (mapContent === "seller") {
            setObjectManagerFilter(() => (object:any) => {
                if (object.properties.type == 'seller') {
                    const isFood = food === '' || object.properties.object.tags.contains(food)
                    const isSellers = seller === '' || object.properties.object.dynamic.toString() === seller
                    return isFood && isSellers && object.properties.type == 'seller'
                } else return false
            })
        }
        if (mapContent === "event") {
            setObjectManagerFilter(() => (object:any) => {
                return object.properties.type == 'event'
            })
        }
        setMapContent(mapContent)
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
            {/*<Group position={ 'apart' }>*/}
                <Select
                    // label='Еда'
                    placeholder='Вся еда'
                    zIndex={600}
                    sx={{ marginBottom: '10px'}}
                    value={ food }
                    //@ts-ignore
                    onChange={ onFoodChange }
                    data={ filterFood }
                    width={'100px'}
                    size={ 'md' }
                />
                {/*<Select*/}
                {/*    // label='Напитки'*/}
                {/*    placeholder='Все напитки'*/}
                {/*    sx={{ marginBottom: '10px',  width: '47%'}}*/}
                {/*    zIndex={600}*/}
                {/*    value={ drink }*/}
                {/*    //@ts-ignore*/}
                {/*    onChange={ onDrinksChange }*/}
                {/*    data={ filterDrinks }*/}
                {/*    size={ 'md' }*/}
                {/*/>*/}
            {/*</Group>*/}

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
                mb={ '10px' }
            />
            <SegmentedControl
                fullWidth
                size={ 'md' }
                value={mapContent}
                onChange={onMapContentChange}
                data={[
                    { label: 'Товары', value: 'seller' },
                    { label: 'Мероприятия', value: 'event' },

                ]}
            />
        </Container>
    );
};

export default FiltersContainer;