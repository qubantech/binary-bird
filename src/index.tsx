import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { CommonModules } from './modules';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AppRootModule from './app.shared/app'
import Navigation from "./app.shared/app.layouts/app.navigation/navigation";
import store from "./store/createstore";
import {Provider} from "react-redux";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Navigation>
                    <Routes>
                        <Route {...AppRootModule.routeProps}/>
                        {
                            CommonModules.map(module =>
                                    <Route {...module.routeProps}
                                           key={module.name}
                                    />
                            )
                        }
                    </Routes>
                </Navigation>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
