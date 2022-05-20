import {Action} from "../../app.shared/app.models/models";
import {userActionTypes} from "./user-action-types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../createstore";


export const loginUser = (email:string, password:string):ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        console.log('here')
        dispatch(setLoading(true))
        const localState = getState()
        console.log(localState)
        //делаем тут запрос (не к firebase) и сохраняем данные в redux
        await setTimeout(() => {dispatch(setLoading(false))}, 1000)
}

export const setUser = (user: any) => {
    return {
        type: userActionTypes.SET_USER,
        payload: user
    }
}

export const setLoading = (bool: boolean) => {
    return {
        type: userActionTypes.SET_LOADING,
        payload: bool
    }
}

export const setUUID = (uid: string) => {
    return {
        type: userActionTypes.SET_UUID,
        payload: uid
    }
}