import {Seller} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useSeller(sellerUuid: string) {
    const seller = useWatchedObject<Seller>(`/sellers/${sellerUuid}`)

    const updateGPS = (latitude: number, longitude: number) => {
        seller.watchedObject &&
        seller.setWatchedObject({
            ...seller.watchedObject,
            gps: {
                latitude: latitude,
                longitude: longitude,
            }
        })
    }

    return {
        watchedObject: seller.watchedObject,
        setWatchedObject: seller.setWatchedObject,
        updateGPS: updateGPS
    }
}

export function useSellersList() {
    return useWatchedObject<Array<Seller | null>>(`/sellers`)
}
