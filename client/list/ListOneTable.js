import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Messages from '@client/components/Messages'
import Pagination from '@client/components/Pagination'
import Loading from '@client/components/Loading'

const renderSubscriber = (subscriber) => {
    return (<li key={subscriber.id_str}><Link to={`/user/${subscriber.id_str}`}>{'@' + subscriber.screen_name}</Link></li>)
}

const renderSubscribers = (listId, subscribers) => {
    if(subscribers.doing) return <Loading />
    if(subscribers.noResults) return (<em>This list has no subscribers.</em>)

    return (
        <Fragment>
            <Messages error={subscribers.errors} />

            <ul>
                {subscribers.data.map(renderSubscriber)}
            </ul>

            <Pagination
                nextCursor={subscribers.nextCursor}
                previousCursor={subscribers.previousCursor}
                urlTemplate={x => x && x !== '-1' && x !== -1 && x !== '0' ? `/list/${listId}/p/${x}` : '/list/{$listId}'}
            />
        </Fragment>
    )
}

export default ({ list, subscribers }) => {
    if(!list) return ''

    return (
        <table className='slim vertical'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{list.name}</td>
                </tr>
                <tr>
                    <th>Owner</th>
                    <td><Link to={`/user/${list.user.id_str}`}>{'@' + list.user.screen_name}</Link></td>
                </tr>
                <tr>
                    <th>Subscribers</th>
                    <td>{renderSubscribers(list.id_str, subscribers)}</td>
                </tr>
            </tbody>
        </table>
    )
}
