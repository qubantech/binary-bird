import {Action, User} from "../../app.shared/app.models/models";
import {userActionTypes} from "./user-action-types";
import {AnyAction} from "@reduxjs/toolkit";

export interface userState {
    userInfo: User
    loading: boolean
}

export const initStateUser:User = {
    uuid: "0",
    firstname: "1",
    lastname: "2",
    phone: 's',
    role: "USER"
}

export const defaultUserState:userState = {
    userInfo: initStateUser,
    loading: false
}

export function userReducer(state:userState=defaultUserState, action:AnyAction) {
    switch (action.type) {
        case userActionTypes.SET_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case userActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }
}