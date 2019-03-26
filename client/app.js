import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '@app/root-reducer'
import App from '@app/app/App'

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
    : reduxCompose

const LOCAL_STORAGE_KEY = 'notTodayState'
const STATE_VERSION = 1 // just an integer. increment to invalidate state

const getIntialState = (config) => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        : {}

    return savedState.stateVersion && savedState.stateVersion === STATE_VERSION
        ? savedState
        : {
            stateVersion: STATE_VERSION,
            config,
            theHistory: undefined, // undefined will load the initial state from the reducer
            memberLists: undefined, // undefined will load the initial state from the reducer
        }
}

window.nottoday = {
    start: (el, config) => {
        const store = createStore(
            rootReducer,
            getIntialState(config),
            composeEnhancers(
                applyMiddleware(thunk)
            )
        )

        store.subscribe(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()))
        })

        render(
            <Provider store={store}>
                <App />
            </Provider>, el
        )
    },
}
