import React, {useEffect, useState} from 'react';
import MapContainer from "./components/map-container";
import { Select, Drawer, Text } from "@mantine/core";
import { AppHeader } from "../../app.shared/app.layouts/app.navigation/header";
import FiltersContainer from "./components/filters-container";
import PointDrawerContent from "./components/point-drawer-content";

import './components/map-point-drawer-style.css'

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
                'seller': {
                    'uuid': '0',
                    'legalEntityName': 'ИП ИВАНОВ',
                    'phone': '+7 (918) 285-0923',
                    'workTime': '8:00-22:00',
                    'gps': {
                        latitude: 44.901300,
                        longitude: 37.315915,
                    },
                    'dynamic': true,
                    'cashier': {
                        firstname: 'Иван',
                        lastname: 'Иванов',
                        photoUrl: 'string',
                    },
                    'tags': ['Шаурма', 'Кукуруза', 'Пирожки'],
                    'goods': [
                        {
                            uuid: 'string',
                            name: 'Шаурма',
                            description: 'Шаурма вкусная',
                            imageUrl: 'string',
                            price: 100,
                        },
                        {
                            uuid: 'string',
                            name: 'Шаурма',
                            description: 'Шаурма вкусная',
                            imageUrl: 'string',
                            price: 100,
                        },
                        {
                            uuid: 'string',
                            name: 'Шаурма',
                            description: 'Шаурма вкусная',
                            imageUrl: 'string',
                            price: 100,
                        }
                    ],
                    'inn': 'string',
                    'photosUrl': [],
                },
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
                'seller': {
                    'uuid': '1',
                    'legalEntityName': 'string',
                    'phone': 'string',
                    'workTime': 'string',
                    'gps': {
                        latitude: 44.901300,
                        longitude: 37.315915,
                    },
                    'dynamic': true,
                    'cashier': {
                        firstname: 'string',
                        lastname: 'string',
                        photoUrl: 'string',
                    },
                    'tags': [],
                    'goods': [],
                    'inn': 'string',
                    'photosUrl': [],
                },
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
                'seller': {
                    'uuid': '2',
                    'legalEntityName': 'string',
                    'phone': 'string',
                    'workTime': 'string',
                    'gps': {
                        latitude: 44.901300,
                        longitude: 37.315915,
                    },
                    'dynamic': true,
                    'cashier': {
                        firstname: 'string',
                        lastname: 'string',
                        photoUrl: 'string',
                    },
                    'tags': [],
                    'goods': [],
                    'inn': 'string',
                    'photosUrl': [],
                },
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
    const [userGPS, setUserGPS] = useState<number[]>()
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object:any) => true)

    const [selectedPoint, setSelectedPoint] = useState(null)
    const [pointDrawer, setPointDrawer] = useState(false)

    const onPlaceMarkClick = (point: any) => {
        setPointDrawer(true)
        setSelectedPoint(point)
    }

    useEffect( () => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(null);
                const lat = position.coords.latitude
                const long = position.coords.longitude
                setMapContainerState({center: [lat, long], zoom: 17})
                setUserGPS([lat,long])
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }

    }, [])

    return (
        <div style={{position: 'relative', width: '100vw'}}>
            <AppHeader title={<Select
                variant={'unstyled'}
                placeholder="Выберите пляж"
                data={[
                    {value: 'react', label: 'Центральный пляж'},
                    {value: 'ng', label: 'Angular'},
                    {value: 'svelte', label: 'Svelte'},
                    {value: 'vue', label: 'Vue'},
                ]}
                defaultValue={'react'}
            />}/>
           <FiltersContainer setObjectManagerFilter={ setObjectManagerFilter }/>
            <MapContainer
                state={ mapContainerState }
                features={ features }
                objectManagerFilter={ objectManagerFilter }
                userGPS={ userGPS }
                onPlaceMarkClick={ onPlaceMarkClick }
            />
            <Drawer
                lockScroll={ false }
                opened={pointDrawer}
                onClose={() => setPointDrawer(false)}
                title={
                    <Text size={ 'xl' }>
                        { //@ts-ignore
                            selectedPoint !== null ? (selectedPoint.properties.seller.legalEntityName) : ''
                        }
                    </Text>
                }
                padding="xl"
                size="70%"
                position="bottom"
                zIndex={700}
            >
                {
                    selectedPoint !== null
                    &&
                    //@ts-ignore
                    <PointDrawerContent seller={ selectedPoint.properties.seller }/>
                }
            </Drawer>

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


