import React from 'react'
import { connect } from 'react-redux'

import './style/app.css'

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

const App = () => {
    return (
        <div className='container'>
            <header />
            <main />
            <footer />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
