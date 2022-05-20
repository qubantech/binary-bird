import {Good} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useGood(goodUuid: string) {
    return useWatchedObject<Good>(`/goods/${goodUuid}`)
}

export function useGoodList() {
    return useWatchedObject<Array<Good | null>>(`/goods`)
}
