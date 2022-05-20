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
import {MantineProvider, MantineThemeOverride} from "@mantine/core";

const MANTINE_THEME: MantineThemeOverride = {
    colors: {
        brand: ['#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC', '#FFE8CC']
    },
    primaryColor: 'orange'
}


ReactDOM.render(
    <React.StrictMode>
        <MantineProvider theme={MANTINE_THEME}>
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
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
