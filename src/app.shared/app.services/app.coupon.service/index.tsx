import {Coupon} from "../../app.models/models";
import {useWatchedObject} from "../app.realtimedb.service";

export function useCoupon(couponUuid: string) {
    return useWatchedObject<Coupon>(`/coupons/${couponUuid}`)
}

export function useCouponsList() {
    return useWatchedObject<Array<Coupon | null>>(`/coupons`)
}
