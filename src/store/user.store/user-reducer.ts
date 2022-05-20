import {Action, UserInfo} from "../../app.shared/app.models/models";
import {userActionTypes} from "./user-action-types";
import {AnyAction} from "@reduxjs/toolkit";

export interface userState {
    userInfo: UserInfo
    loading: boolean
}

export const defaultUserState:userState = {
    userInfo: {
        userId: "qwerty",
        role: "role"
    },
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