import { Order, OrderCreateDto, OrderStatus } from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";
import { v4 as uuidv4 } from "uuid";

export function useOrder(orderUuid: string) {
    const order = useWatchedObject<Order>(`/orders/${orderUuid}`)

    const changeStatus = (status: OrderStatus) => {
        order.watchedObject &&
        order.setWatchedObject({
            ...order.watchedObject,
            status: status
        })
    }

    const finishOrder = () => {
        changeStatus("FINISHED")
    }

    const cancelOrder = () => {
        changeStatus("CANCELLED")
    }

    return {
        ...order,
        do: {
            finish: finishOrder,
            cancel: cancelOrder
        }
    }
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

    const changeStatus = (status: OrderStatus, uuid: string) => {
        const orderToUpdate = ordersList.watchedObject?.find(order => order?.uuid == uuid)

        const order = {
            ...orderToUpdate,
            status: status,
        } as Order

        ordersList.watchedObject
            ? ordersList.setWatchedObject([
                ...ordersList.watchedObject,
                order
            ])
            : ordersList.setWatchedObject([order])
    }

    const finishOrder = (uuid: string) => {
        changeStatus("FINISHED", uuid)
    }

    const cancelOrder = (uuid: string) => {
        changeStatus("CANCELLED", uuid)
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