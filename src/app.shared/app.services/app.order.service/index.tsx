import { Order, OrderCreateDto, OrderStatus } from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";
import { v4 as uuidv4 } from "uuid";

export function useOrder(orderUuid: string) {
    return useWatchedObject<Order>(`/orders/${orderUuid}`)
}

export function useOrdersList() {
    const ordersList = useWatchedObject<Array<Order | null>>(`/orders`)

    const placeOrder = (orderDto: OrderCreateDto) => {
        const uuid = uuidv4()

        const order = {
            ...orderDto,
            uuid: uuid,
            status: "PLACED" as OrderStatus
        }

        ordersList.watchedObject
            ? ordersList.setWatchedObject([
                ...ordersList.watchedObject,
                order
            ])
            : ordersList.setWatchedObject([order])
    }

    const finishOrder = (uuid: string) => {
        const orderToUpdate = ordersList.watchedObject?.find(order => order?.uuid == uuid)

        const order = {
            ...orderToUpdate,
            status: "FINISHED" as OrderStatus,
        } as Order

        ordersList.watchedObject
            ? ordersList.setWatchedObject([
                ...ordersList.watchedObject,
                order
            ])
            : ordersList.setWatchedObject([order])
    }

    const cancelOrder = (uuid: string) => {
        const orderToUpdate = ordersList.watchedObject?.find(order => order?.uuid == uuid)

        const order = {
            ...orderToUpdate,
            status: "CANCELLED" as OrderStatus,
        } as Order

        ordersList.watchedObject
            ? ordersList.setWatchedObject([
                ...ordersList.watchedObject,
                order
            ])
            : ordersList.setWatchedObject([order])
    }

    return {
        ...ordersList,
        do: {
            place: placeOrder,
            finish: finishOrder,
            cancel: cancelOrder
        }
    }
}
