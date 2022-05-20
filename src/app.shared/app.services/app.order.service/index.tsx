import {Order} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useOrder(orderUuid: string) {
    return useWatchedObject<Order>(`/orders/${orderUuid}`)
}

export function useOrdersList() {
    return useWatchedObject<Array<Order | null>>(`/orders`)
}
