import React from 'react'

import './style/layout.css'
import './style/main.css'

export default ({ children }) => {
    return (
        <div id='container'>
            <header />

            <main>
                {children}
            </main>

            <footer />
        </div>
    )
}
