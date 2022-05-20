import { useState } from "react";
import { putObject, watchObject } from "../../app.configs/firebase-operations";
import { Chat, Message } from "../../app.models/models";
import { useWatchedObject } from "../app.realtimedb.service";

export function useWatchedChat(userUuid: string, sellerUuid: string) {
    const [lastWatchedObject, setLastWatchedObject] = useState<Chat | null>(null)

    const watchedPath = `chats/${userUuid}/${sellerUuid}`

    watchObject<Chat | null>(watchedPath, (newObject) => {
        if (JSON.stringify(lastWatchedObject) !== JSON.stringify(newObject))
            setLastWatchedObject(newObject)
    })

    const setWatchedObject = (object: Chat | null): void => {
        putObject<Chat | null>(watchedPath, object)
            .then()
    }

    const addMessage = (message: Message) => {
        lastWatchedObject
            ? setWatchedObject({
                messages: [
                    ...(lastWatchedObject.messages),
                    message
                ]
            })
            : setWatchedObject({
                messages: [message]
            })
    }

    return {
        watchedObject: lastWatchedObject,
        setWatchedObject: setWatchedObject,
        addMessage: addMessage
    }
}

export function useChat(userUuid: string, sellerUuid: string) {
    return useWatchedChat(userUuid, sellerUuid)
}

export function useChatsList() {
    return useWatchedObject<Array<Chat | null>>(`/chats`)
}
