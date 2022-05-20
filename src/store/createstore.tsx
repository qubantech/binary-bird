import {
    AnyAction,
    combineReducers,
    configureStore,
    ThunkDispatch
} from "@reduxjs/toolkit";
import {defaultUserState, userReducer, userState} from "./user.store/user-reducer";
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export interface RootReducer {
    user: userState,
}

const InitialState:RootReducer = {
    user: defaultUserState
}

const rootReducers = combineReducers({
    user: userReducer
})

const store = configureStore({reducer: rootReducers, preloadedState: InitialState, middleware: [thunk]});

export type RootState = ReturnType<typeof rootReducers>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector

export default store;