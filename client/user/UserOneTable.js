import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Messages from '@client/components/Messages'
import Pagination from '@client/components/Pagination'
import Loading from '@client/components/Loading'

const renderFollower = (follower) => {
    return (<li key={follower.id_str}><Link to={`/user/${follower.id_str}`}>{'@' + follower.screen_name}</Link></li>)
}

const renderFollowers = (userId, followers) => {
    if(followers.doing) return <Loading />
    if(followers.noResults) return (<em>This user has no followers.</em>)

    return (
        <Fragment>
            <Messages error={followers.errors} />

            <ul>
                {followers.data.map(renderFollower)}
            </ul>

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
                    <td><a href={`https://twitter.com/${encodeURIComponent(user.screen_name)}`}>{'@' + user.screen_name}</a></td>
                </tr>
                <tr>
                    <th>Followers</th>
                    <td>{renderFollowers(user.id_str, followers)}</td>
                </tr>
            </tbody>
        </table>
    )
}
