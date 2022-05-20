import {Event} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useEvent(eventUuid: string) {
    return useWatchedObject<Event>(`/events/${eventUuid}`)
}

export function useEventsList() {
    return useWatchedObject<Array<Event | null>>(`/events`)
}
