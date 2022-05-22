import {userActionTypes} from "../user.store/user-action-types";
import {Good} from "../../app.shared/app.models/models";
import {cartActionTypes} from "./cart-action-types";

export const setGoods = (good:Good[]) => {
    return {
        type: cartActionTypes.SET_GOOD,
        payload: good
    }
}

export const setAmount = (id: string, amount: number) => {
    return {
        type: cartActionTypes.SET_AMOUNT,
        payload: {id, amount}
    }
}

export const setUid = (uid:string) => {
    return {
        type: cartActionTypes.SET_UID,
        payload: uid
    }
}