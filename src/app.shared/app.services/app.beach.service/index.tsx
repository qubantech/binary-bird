import { useState } from "react";
import { putObject, watchObject } from "../../app.configs/firebase-operations";
import { Beach } from "../../app.models/models";
import { useBeachStateList } from "../app.beach-state.service";

export function useBeach() {

    const beachStates = useBeachStateList()
    const [lastWatchedObject, setLastWatchedObject] = useState<Beach | null>(null)

    const getBeachStateByToken = (name: string) => beachStates.watchedObject?.find(state => state?.name == name)

    const watchedPath = `/beach`

    watchObject<Beach | null>(watchedPath, (newObject) => {
        if (JSON.stringify(lastWatchedObject) !== JSON.stringify(newObject))
            setLastWatchedObject(newObject)
    })

    const setWatchedObject = (object: Beach | null): void => {
        putObject<Beach | null>(watchedPath, object)
            .then()
    }

    const toggleState = (token: "best" | "good" | "normal" | "bad") => {

        const state = getBeachStateByToken(token)
        lastWatchedObject && state &&
        setWatchedObject({
            ...lastWatchedObject,
            currentState: state,
        })
    }

    const toggleBest = () => {
        toggleState("best")
    }

    const toggleGood = () => {
        toggleState("good")
    }

    const toggleNormal = () => {
        toggleState("normal")
    }

    const toggleBad = () => {
        toggleState("bad")
    }

    return {
        watchedObject: lastWatchedObject,
        setWatchedObject: setWatchedObject,
        toggle: {
            best: toggleBest,
            good: toggleGood,
            normal: toggleNormal,
            bad: toggleBad
        }
    }
}