import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { paramUrl } from '@shared/lib/url'
import { isAuthenticated, saveReturnPath } from '@client/lib/auth'

const mapStateToProps = ({ auth, config }) => ({
    auth,
    config,
})

const mapDispatchToProps = (dispatch) => ({})

const Authorize = ({ authUrl }) => {
    const path = paramUrl(location.pathname, location.search)

    // we don't want to save the logout url
    const returnPath = /\/logout$/.test(path)
        ? '/'
        : path

    // the user is going to be redirected, save the current URL so we can bring the user back on login
    saveReturnPath(returnPath)

    window.location.href = authUrl

    return ''
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(({ auth, config }) => {
    return isAuthenticated(auth.expiresAt)
        ? ''
        : (<Authorize authUrl={config.auth.authUrl} />)
}))
