import { useWatchedObject } from "../app.realtimedb.service";
import { BeachState } from "../../app.models/models";

export function useBeachState(name: string) {
    return useWatchedObject<BeachState>(`/beach-state/${name}`)
}

export function useBeachStateList() {
    return useWatchedObject<Array<BeachState | null>>(`/beach-state`)
}
