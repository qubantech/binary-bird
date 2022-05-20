import { OrderedGood, OrderedGoodCreateDto } from "../../app.models/models";
import { useWatchedObject } from "../app.realtimedb.service";
import { v4 as uuidv4 } from "uuid";

export function useOrderedGood(orderedGoodUuid: string) {
    return useWatchedObject<OrderedGood>(`/ordered-goods/${orderedGoodUuid}`)
}

export function useOrderedGoodList() {
    const orderedGoodsList = useWatchedObject<Array<OrderedGood | null>>(`/ordered-goods`)

    const addOrderedGood = (orderedGoodDto: OrderedGoodCreateDto) => {

        const uuid = uuidv4()

        const orderedGood = {
            ...orderedGoodDto,
            uuid: uuid
        }

        orderedGoodsList.watchedObject
            ? orderedGoodsList.setWatchedObject([
                ...orderedGoodsList.watchedObject,
                orderedGood
            ])
            : orderedGoodsList.setWatchedObject([orderedGood])
    }

    return {
        ...orderedGoodsList,
        addOrderedGood: addOrderedGood
    }
}
