import {userActionTypes} from "../user.store/user-action-types";
import {Good} from "../../app.shared/app.models/models";
import {cartActionTypes} from "./cart-action-types";

export const SetGood = (good:Good[]) => {
    return {
        type: cartActionTypes.SET_GOOD,
        payload: good
    }
}

export const SetAmount = (id:number, amount:number) => {
    return {
        type: cartActionTypes.SET_AMOUNT,
        payload: {id, amount}
    }
}