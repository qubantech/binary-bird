import {Place} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function usePlace(placeUuid: string) {
    return useWatchedObject<Place>(`/places/${placeUuid}`)
}

export function usePlacesList() {
    return useWatchedObject<Array<Place | null>>(`/places`)
}
