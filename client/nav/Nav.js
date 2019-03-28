import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { classnames } from '@app/lib/classes'
import { toggleMenu } from './actions'
import { navActiveClass } from '@app/lib/nav'

import './style/nav.css'

const mapStateToProps = ({ nav }) => ({
    navState: nav,
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        toggleMenu,
    }, dispatch),
})

const Nav = ({ location, navState, actions }) => {
    const triggerClass = classnames([
        'trigger',
        navState.menuOpen ? 'is-open' : 'not-open',
    ])

    const ulClass = classnames([
        'menu',
        navState.menuOpen ? 'is-open' : 'not-open',
    ])

    return (
        <Fragment>
            <nav>
                <div className={triggerClass} onClick={actions.toggleMenu}>
                    <div className='trigger-inner' />
                </div>

                <ul className={ulClass}>
                    <li><NavLink exact to='/'>Home</NavLink></li>
                    <li className={navActiveClass(location, { starts: '/member-lists' })}>
                        <NavLink to='/member-lists'>Member Lists</NavLink>
                    </li>
                    <li><NavLink to='/logout'>Logout</NavLink></li>
                </ul>
            </nav>
        </Fragment>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
