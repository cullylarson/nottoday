import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { logout } from '@client/auth/actions'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        logout,
    }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(({ actions }) => {
    actions.logout()

    return <Redirect to='/' />
})
