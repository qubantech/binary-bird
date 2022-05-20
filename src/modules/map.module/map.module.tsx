import React, {useEffect, useState} from 'react';
import MapContainer from "./components/map-container";
import { Select } from "@mantine/core";
import { AppHeader } from "../../app.shared/app.layouts/app.navigation/header";
import FiltersContainer from "./components/filters-container";

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
    const [userGPS, setUserGPS] = useState<number[]>()
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object:any) => true)


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
            />
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


