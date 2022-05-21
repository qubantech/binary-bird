import React, {useEffect, useState} from 'react';
import MapContainer from "./components/map-container";
import { Select, Drawer, Text } from "@mantine/core";
import { AppHeader } from "../../app.shared/app.layouts/app.navigation/header";
import FiltersContainer from "./components/filters-container";
import PointDrawerContent from "./components/point-drawer-content";

import './components/map-point-drawer-style.css'

import lavkaMark from './assets/lavka-mark.svg'
import brodyagaMark from './assets/brodyaga-mark.svg'
import EventDrawerContent from "./components/event-drawer-content";

import {useEventsList} from "../../app.shared/app.services/app.event.service";

import eventMark from './assets/event-mark.svg'
import {useSellersList} from "../../app.shared/app.services/app.sellers.service";
import {Good} from "../../app.shared/app.models/models";


const Map = () => {
    const [mapContainerState, setMapContainerState] = useState({center: [44.901300, 37.315515], zoom: 17})
    const [objectManagerFilter, setObjectManagerFilter] = useState(() => (object:any) => object.properties.type == 'seller')

    //seller's points
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [pointDrawer, setPointDrawer] = useState(false)

    const onPlaceMarkClick = (point: any) => {
        if (point.properties !== undefined) {
            if (point.properties.type == 'seller') {
                setSelectedPoint(point.properties.object)
                setPointDrawer(true)
            }
            if (point.properties.type == 'event') {
                setEventPoint(point.properties.object)
                setEventDrawer(true)
            }
        } else {
            setEventPoint(point.ambulance)
            setEventDrawer(true)
        }
    }

    //events
    const [eventPoint, setEventPoint] = useState(null)
    const [eventDrawer, setEventDrawer] = useState(false)

    // const onEventClick = (point: any) => {
    //     if (point.properties !== undefined) {
    //         setEventPoint(point.properties.event)
    //     } else {
    //         setEventPoint(point.ambulance)
    //     }
    //
    //     setEventDrawer(true)
    // }

    const eventsList = useEventsList()

    const [sellers, setSellers] = useState([])
    const [events, setEvents] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [features, setFeatures] = useState({
        type: "FeatureCollection",
        features: []
    })

    useEffect(() => {
        if (eventsList.watchedObject !== null) {
            let tempFeatures: any = []

            eventsList.watchedObject.forEach( (element, index) => {
                if (element !== null) {
                    let tempElement = {
                        "type": "Feature",
                        "id": element.name,
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                element.gps.latitude,
                                element.gps.longitude
                            ]
                        },
                        "properties": {
                            'type': 'event',
                            'object': {
                                'type': 'Мероприятие',
                                "name": element.name,
                                "description": element.description,
                                "time": element.time,
                                "photoUrl": element.photoUrl,
                            }
                        },
                        "options": {
                            iconLayout: "default#image",
                            iconImageHref: eventMark,
                            iconImageSize: [70, 90],
                        }
                    }
                    tempFeatures.push(tempElement);
                }
            })

            setEvents(tempFeatures)

            // setFeatures({
            //     type: "FeatureCollection",
            //     features: tempFeatures
            // })

        }

    }, [eventsList.watchedObject])

    const sellersList = useSellersList()

    useEffect(() => {
        if (sellersList.watchedObject !== null) {
            let tempFeatures: any = []

            sellersList.watchedObject.forEach( (element, index) => {
                if (element != null) {
                    let tempElement = {
                        "type": "Feature",
                        "id": index,
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                element.gps.latitude,
                                element.gps.longitude - 0.0007
                            ]
                        },
                        "properties": {
                            'type': 'seller',
                            'object': {
                                "id": index,
                                'uuid': element.uuid ,
                                'legalEntityName': element.legalEntityName,
                                'phone': element.phone,
                                'workTime': element.workTime,
                                'gps': {
                                    latitude: 44.901300,
                                    longitude: 37.315915,
                                },
                                'dynamic': element.dynamic,
                                'cashier': {
                                    firstname: element.cashier.firstname,
                                    lastname: element.cashier.lastname,
                                    photoUrl: element.cashier.photoUrl,
                                },
                                'tags': element.tags,
                                'goods': element.goods,
                                'inn': element.inn,
                                'photosUrl': element.photosUrl,
                            },
                        },
                        "options": {
                            iconLayout: "default#image",
                            iconImageHref: element.dynamic ? brodyagaMark : lavkaMark,
                            iconImageSize: [70, 90],
                        }
                    }
                    tempFeatures.push(tempElement);
                }
            })

            setSellers(tempFeatures)

            // setFeatures({
            //     type: "FeatureCollection",
            //     features: tempFeatures
            // })
        }
    }, [sellersList.watchedObject])

    const [tags, setTags] = useState<any>()

    useEffect(() => {
        let features: any = []
        if (sellers.length !== 0 && events.length !== 0) {
            features.push(...sellers)
            features.push(...events)

            let tempTags: any = []
            features.map((item: any, index: number) => {
                if (item.properties.type == 'seller') {
                    item.properties.object.tags.map((tag:string) => tempTags.push(tag))
                }
                return {...item, id: index}
            })
            const setTempTags = new Set(tempTags)
            setTags(setTempTags)


            setFeatures({
                type: "FeatureCollection",
                features: features
            })
            setIsLoading(false)
        }
    }, [sellers, events])


    //gps
    const [userGPS, setUserGPS] = useState<number[]>()

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
           <FiltersContainer tags={ tags } setObjectManagerFilter={ setObjectManagerFilter } />
            <MapContainer
                state={ mapContainerState }
                features={ features }
                objectManagerFilter={ objectManagerFilter }
                userGPS={ userGPS }
                onPlaceMarkClick={ onPlaceMarkClick }
                isLoading={ isLoading }
            />
            <Drawer
                opened={pointDrawer}
                onClose={() => setPointDrawer(false)}
                title={
                    <Text size={ 'xl' }>
                        { //@ts-ignore
                            selectedPoint !== null ? (selectedPoint.legalEntityName) : ''
                        }
                    </Text>
                }
                padding="xl"
                size="70%"
                position="bottom"
                zIndex={700}
                // sx={{borderRadius: '10px 10px 10px 0'}}
            >
                {
                    selectedPoint !== null
                    &&
                    //@ts-ignore
                    <PointDrawerContent seller={ selectedPoint } id={ selectedPoint.id } />
                }
            </Drawer>

            <Drawer
                opened={eventDrawer}
                onClose={() => setEventDrawer(false)}
                title={
                    <Text size={ 'xl' }>
                        {/*@ts-ignore*/}
                        { eventPoint !== null && eventPoint.type }
                    </Text>
                }
                padding="xl"
                size="60%"
                position="bottom"
                zIndex={700}
            >
                {

                    eventPoint !== null
                    &&
                    //@ts-ignore
                    <EventDrawerContent event={ eventPoint }/>

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


