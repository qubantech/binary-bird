import React, { FC } from 'react'
import { ObjectManager } from 'react-yandex-maps'

interface ObjectManagerContainerProps {
    features: any,
    onPlaceMarkClick: () => void,
    objectManagerFilter: (object:any) => boolean
}

const ObjectManagerContainer: FC<ObjectManagerContainerProps> =
    ({
         features,
         onPlaceMarkClick,
         objectManagerFilter
     }) => {
        return (
            <>
                <ObjectManager
                    options={{
                        // clusterize: true,
                        // gridSize: 100,
                    }}
                    clusters={{
                        // preset: 'islands#greenClusterIcons',
                    }}

                    features={ features }
                    filter={ objectManagerFilter }
                    instanceRef={ref =>
                        //@ts-ignore
                        ref?.objects.events.add('click', (e) => {
                            const objectId = e.get('objectId')
                            //@ts-ignore
                            let obj = ref?.objects.getById(objectId)
                            //@ts-ignore
                            onPlaceMarkClick(obj)
                        })}
                />
            </>
        )
    }

export default ObjectManagerContainer