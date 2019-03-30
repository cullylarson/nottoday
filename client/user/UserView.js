import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Loading from '@client/components/Loading'
import Messages from '@client/components/Messages'
import UserOneTable from './UserOneTable'

const mapStateToProps = ({ user }) => ({
    user,
})

const mapDispatchToProps = (dispatch) => ({})

const UserView = ({ user }) => {
    const renderUser = () => {
        if(user.one.doing) return <Loading />
        if(!user.one.data) return ''

        return (
            <UserOneTable user={user.one.data} followers={user.followers} />
        )
    }

    return (
        <Fragment>
            <h1>User</h1>

            <Messages error={user.one.errors} />

            {renderUser()}
        </Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
