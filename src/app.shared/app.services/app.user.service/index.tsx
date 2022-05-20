import {UserInfo} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useUser(userId: string) {
    return useWatchedObject<UserInfo>(`/users/${userId}`)
}

export function useUserList() {
    return useWatchedObject<Array<UserInfo | null>>(`/users`)
}
