import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Messages from '@client/components/Messages'
import Pagination from '@client/components/Pagination'
import Loading from '@client/components/Loading'
import UserItemView from './UserItemView'

const renderFollowers = (userId, followers) => {
    if(followers.doing) return <Loading />
    if(followers.noResults) return (<em>This user has no followers.</em>)

    return (
        <Fragment>
            <Messages error={followers.errors} />

            <div className='followers'>
                {followers.data.map(user => (<UserItemView
                    user={user}
                    makeLink={x => (<Link to={`/user/${user.id_str}`}>{x}</Link>)}
                />))}
            </div>

            <Pagination
                nextCursor={followers.nextCursor}
                previousCursor={followers.previousCursor}
                urlTemplate={x => x && x !== '-1' && x !== -1 && x !== '0' ? `/user/${userId}/p/${x}` : '/user/{$userId}'}
            />
        </Fragment>
    )
}

export default ({ user, followers }) => {
    if(!user) return ''

    return (
        <table className='slim vertical'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td><UserItemView user={user} makeLink={x => (<a href={`https://twitter.com/${encodeURIComponent(user.screen_name)}`}>{x}</a>)} /></td>
                </tr>
                <tr>
                    <th>Followers</th>
                    <td>{renderFollowers(user.id_str, followers)}</td>
                </tr>
            </tbody>
        </table>
    )
}
