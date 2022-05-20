import React, {FC} from 'react';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import ObjectManagerContainer from "./object-manager-container";


interface MapContainerProps {
    state: {
        center: number[],
        zoom: number
    },
    width?: string,
    height?: string,
    features: any,
    objectManagerFilter: (object:any) => boolean,
    userGPS: number[] | undefined,
}

const MapContainer: FC<MapContainerProps> = ({
                                                 state={center: [44.8857, 37.31992], zoom: 14},
                                                 width='100%',
                                                 height= '100vh',
                                                 features,
                                                 objectManagerFilter,
                                                 userGPS
                                             }) => {
    return (
        <>
            <YMaps>
                <Map state={ state } width={ width } height={ height }>
                    <ObjectManagerContainer
                        features={ features }
                        objectManagerFilter={ objectManagerFilter }
                        onPlaceMarkClick={ () => {} }

                    />
                    {
                        userGPS &&
                        <Placemark
                            geometry={ userGPS }
                        />
                    }
                </Map>
            </YMaps>
        </>
    );
};

export default MapContainer;