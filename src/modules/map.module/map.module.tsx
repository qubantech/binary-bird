import React, { useState } from 'react';
import MapContainer from "./components/map-container";
import {Container, Select} from "@mantine/core";

const features = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'id': 0,
            'geometry': {
                'type': 'Point',
                'coordinates': [44.901300, 37.315915]
            },
            'properties': {
                'hintContent': 'item',
                'seller': '0',
                'food': '0',
                'drink': '-1'
            },
            'options': {
                // iconLayout: 'default#image',
                // iconImageHref: placemark,
                // iconImageSize: [30, 49],
            }
        },
        {
            'type': 'Feature',
            'id': 1,
            'geometry': {
                'type': 'Point',
                'coordinates': [44.901300, 37.316915]
            },
            'properties': {
                'hintContent': 'item',
                'seller': '1',
                'food': '-1',
                'drink': '0'
            },
            'options': {
                // iconLayout: 'default#image',
                // iconImageHref: placemark,
                // iconImageSize: [30, 49],
            }
        },
        {
            'type': 'Feature',
            'id': 2,
            'geometry': {
                'type': 'Point',
                'coordinates': [44.901300, 37.317915]
            },
            'properties': {
                'hintContent': 'item',
                'seller': '0',
                'food': '1',
                'drink': '-1'
            },
            'options': {
                // iconLayout: 'default#image',
                // iconImageHref: placemark,
                // iconImageSize: [30, 49],
            }
        }
    ]
}


const Map = () => {
    const [mapContainerState, setMapContainerState] = useState({center: [44.901300, 37.315915], zoom: 17})
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object:any) => true)

    const [filterDrinks, setFilterDrinks] = useState([
        { value: '', label: 'Все напитки' },
        { value: '0', label: 'Лимонад' },
        { value: '1', label: 'Квас' },
    ])
    const [filterFood, setFilterFood] = useState([
        { value: '', label: 'Вся еда' },
        { value: '0', label: 'Кукуруза' },
        { value: '1', label: 'Пирожки' },
    ])
    const [filterSellers, setFilterSellers] = useState([
        { value: '', label: 'Все продавцы' },
        { value: '0', label: 'Лавки' },
        { value: '1', label: 'Кочевники' },
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
            const isSellers = seller === '' || object.properties.seller === seller
            return (isFood || isDrinks) && isSellers
        })
        setSeller(seller)
    }



    return (
        <div style={{position: 'relative', width: '100vw'}}>
            <Container
                sx={{
                    position: 'absolute',
                    zIndex: 500,
                    backgroundColor: '#FFFFFF',
                    padding: '20px',
                    // marginTop: '10px',
                    // left: 0,
                    // right: 0,
                    // marginLeft: 'auto',
                    // marginRight: 'auto',
                    // boxShadow: '0px 10px 15px darkGrey',
                    // border: '1.11343px solid #EAEBEF',
                    borderRadius: '0 0 10px 10px',
                    boxShadow: '-10px 4px 20px rgba(48, 48, 48, 0.1)',
                    width: '90%',
                }}
            >
                <Select
                    // label='Еда'
                    placeholder='Вся еда'
                    zIndex={600}
                    sx={{ marginBottom: '10px'}}
                    value={ food }
                    //@ts-ignore
                    onChange={ onFoodChange }
                    data={ filterFood }
                />
                <Select
                    // label='Напитки'
                    placeholder='Все напитки'
                    sx={{ marginBottom: '10px'}}
                    zIndex={600}
                    value={ drink }
                    //@ts-ignore
                    onChange={ onDrinksChange }
                    data={ filterDrinks }
                />
                <Select
                    // label='Продавцы'
                    placeholder='Все продавцы'
                    // sx={{width: '130px'}}
                    zIndex={600}
                    value={ seller }
                    //@ts-ignore
                    onChange={ onSellerChange }
                    data={ filterSellers }
                />

            </Container>
            <MapContainer state={ mapContainerState } features={ features } objectManagerFilter={ objectManagerFilter }/>
        </div>
    );
};

export default {
    routeProps: {
        path: 'map',
        exact: true,
        index: false,
        element: <Map/>,
    },
    name: 'MapModule',
};


