import React, {FC} from 'react';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import ObjectManagerContainer from "./object-manager-container";
import AmbulanceMarkContainer from "./ambulance-mark-container/ambulance-mark-container";
import AdminHouseMarkContainer from "./admin-house-mark-container/admin-house-mark-container";


interface MapContainerProps {
    state: {
        center: number[],
        zoom: number
    },
    width?: string,
    height?: string,
    features: any,
    objectManagerFilter: any,
    userGPS: number[] | undefined,
    onPlaceMarkClick: any,
    isLoading: boolean
}

const MapContainer: FC<MapContainerProps> = ({
                                                 state={center: [44.8857, 37.31992], zoom: 14},
                                                 width='100%',
                                                 height= '100vh',
                                                 features,
                                                 objectManagerFilter,
                                                 userGPS,
                                                 onPlaceMarkClick,
                                                 isLoading
                                             }) => {
    return (
        <>
            <YMaps>
                <Map state={ state } width={ width } height={ height }>
                    {
                        !isLoading &&
                        <ObjectManagerContainer
                            features={ features }
                            objectManagerFilter={ objectManagerFilter }
                            onPlaceMarkClick={ onPlaceMarkClick }
                        />
                    }
                    {
                        userGPS &&
                        <Placemark
                            geometry={ userGPS }
                        />
                    }
                    <AmbulanceMarkContainer
                        geometry={ [44.900090, 37.315505] }
                        ambulance={{
                            type: 'Спасательный пункт',
                            name: 'Спасательный пункт №1',
                            description: 'Всегда на страже Вашей безопасности и спокойствия! Гарантируем незамедлительное оказание первой помощи.',
                            time: 'Круглосуточно',
                            photoUrl: 'https://foto.cheb.ru/foto/foto.cheb.ru-206670.jpg'
                        }}
                        onEventClick={ onPlaceMarkClick }
                    />
                    <AmbulanceMarkContainer
                        geometry={ [44.903790, 37.317905] }
                        ambulance={{
                            type: 'Спасательный пункт',
                            name: 'Спасательный пункт №2',
                            description: 'Всегда на страже Вашей безопасности и спокойствия! Гарантируем незамедлительное оказание первой помощи.',
                            time: 'Круглосуточно',
                            photoUrl: 'https://konveyt.ru/upload/iblock/5f3/5f3b4932aae91367d9f241b9c93172d9.jpg'
                        }}
                        onEventClick={ onPlaceMarkClick }
                    />
                    {/*<AdminHouseMarkContainer*/}
                    {/*    geometry={ [44.901790, 37.316905] }*/}
                    {/*    ambulance={{*/}
                    {/*        name: 'Дом администратора пляжа',*/}
                    {/*        description: 'Всегда на страже Вашей безопасности и спокойствия! Гарантируем незамедлительное оказание первой помощи.',*/}
                    {/*        time: '9:00 – 19:00',*/}
                    {/*        photoUrl: 'https://konveyt.ru/upload/iblock/5f3/5f3b4932aae91367d9f241b9c93172d9.jpg'*/}
                    {/*    }}*/}
                    {/*    onEventClick={ onEventClick }*/}
                    {/*/>*/}

                </Map>
            </YMaps>
        </>
    );
};

export default MapContainer;