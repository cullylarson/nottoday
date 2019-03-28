import React, { lazy } from 'react'

import './style/layout.css'
import './style/main.css'

const Nav = lazy(() => import('@app/nav/Nav'))

export default ({ children }) => {
    return (
        <div id='container'>
            <header>
                <Nav />
            </header>

            <main>
                {children}
            </main>

            <footer />
        </div>
    )
}
