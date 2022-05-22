import {AnyAction} from "@reduxjs/toolkit";
import {cartActionTypes} from "./cart-action-types";
import {Good, User} from "../../app.shared/app.models/models";

export interface cartState {
    goods: Good[],
    amount: number[],
    buyerUid: string
}

export const defaultCartState:cartState = {
    goods: [],
    amount: [],
    buyerUid: ""
}

export function cartReducer(state:cartState=defaultCartState, action:AnyAction) {
    switch (action.type) {
        case cartActionTypes.SET_GOOD:
            return {
                ...state,
                goods: action.payload,
            }
        case cartActionTypes.SET_UID:
            return {
                ...state,
                buyerUid: action.payload
            }
        case cartActionTypes.SET_AMOUNT:
            return {
                ...state,
                amount: {
                    ...state.amount,
                   [action.payload.id]: action.payload.amount
                }
            }
        default: return state
    }
}