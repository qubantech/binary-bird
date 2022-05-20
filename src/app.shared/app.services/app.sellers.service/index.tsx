import {Seller} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useSeller(sellerUuid: string) {
    return useWatchedObject<Seller>(`/sellers/${sellerUuid}`)
}

export function useSellersList() {
    return useWatchedObject<Array<Seller | null>>(`/sellers`)
}
