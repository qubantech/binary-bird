import {
    AnyAction,
    combineReducers,
    configureStore,
    ThunkDispatch
} from "@reduxjs/toolkit";
import {defaultUserState, userReducer, userState} from "./user.store/user-reducer";
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {cartReducer, cartState, defaultCartState} from "./cart.store/cart-reducer";

export interface RootReducer {
    user: userState,
    cart: cartState
}

const InitialState:RootReducer = {
    user: defaultUserState,
    cart: defaultCartState
}

const rootReducers = combineReducers({
    user: userReducer,
    cart: cartReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducers);

//@ts-ignore
export const store = configureStore({reducer: pReducer, preloadedState: InitialState, middleware: [thunk]});

export type RootState = ReturnType<typeof pReducer>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector

export const persistor = persistStore(store);

const st = () => {
    //@ts-ignore
    let store =  configureStore({reducer: pReducer, preloadedState: InitialState, middleware: [thunk]});
    //@ts-ignore
    let persistor = persistStore(store)
    return { store, persistor }
}

export default st;
