import {Notification} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useNotification(notificationUuid: string) {
    return useWatchedObject<Notification>(`/notifications/${notificationUuid}`)
}

export function useNotificationsList() {
    return useWatchedObject<Array<Notification | null>>(`/notifications`)
}
