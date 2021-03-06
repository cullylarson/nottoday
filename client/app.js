import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import thunk from 'redux-thunk'
import { getAuthSession, verifyAuthentication, getReturnPath } from '@client/lib/auth'
import rootReducer from '@client/root-reducer'
import App from '@client/app/App'

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
    : reduxCompose

const getIntialState = (config) => {
    const authSession = getAuthSession()

    return {
        auth: authSession,
        config,
    }
}

window.nottoday = {
    start: (el, config) => {
        const doStart = () => {
            const store = createStore(
                rootReducer,
                getIntialState(config),
                composeEnhancers(
                    applyMiddleware(thunk)
                )
            )

            render(
                <Provider store={store}>
                    <App />
                </Provider>, el
            )
        }

        if(window.location.pathname === '/login/callback/') {
            verifyAuthentication()
                .then(_ => {
                    const returnPath = getReturnPath() || '/'

                    window.location.href = returnPath
                })
                .catch(_ => {
                    window.location.href = '/'
                })
        }
        else {
            doStart()
        }
    },
}
