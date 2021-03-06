import { Good, GoodCreateDto } from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";
import { v4 as uuidv4 } from 'uuid';

export function useGood(goodUuid: string) {
    return useWatchedObject<Good>(`/goods/${goodUuid}`)
}

export function useGoodList() {
    const goodsList =  useWatchedObject<Array<Good | null>>(`/goods`)

    const addGood = (goodDto: GoodCreateDto) => {

        const uuid = uuidv4()

        const good = {
            ...goodDto,
            uuid: uuid
        }

        goodsList.watchedObject
            ? goodsList.setWatchedObject([
                ...goodsList.watchedObject,
                good
            ])
            : goodsList.setWatchedObject([good])
    }

    return {
        ...goodsList,
        addGood: addGood
    }
}