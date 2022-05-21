import {AnyAction} from "@reduxjs/toolkit";
import {cartActionTypes} from "./cart-action-types";
import {Good, User} from "../../app.shared/app.models/models";

export interface cartState {
    goods: Good[],
    amount: number[]
}

export const defaultCartState = {
    goods: [],
    amount: []
}

export function cartReducer(state:cartState=defaultCartState, action:AnyAction) {
    switch (action.type) {
        case cartActionTypes.SET_GOOD:
            return {
                ...state,
                goods: action.payload,
                amount: new Array(action.payload.length).fill(0)
            }
        // case cartActionTypes.SET_AMOUNT:
        //     return {
        //         ...state,
        //         //@ts-ignore
        //         amount: {
        //             ...amount,
        //             amount[action.payload.id]: action.payload.amount
        //         }
        //     }
        default: return state
    }
}