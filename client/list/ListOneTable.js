import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '@client/components/Loading'

const renderSubscriber = (subscriber) => {
    return (<li key={subscriber.id_str}><a href={`https://twitter.com/${encodeURIComponent(subscriber.screen_name)}`}>{subscriber.screen_name}</a></li>)
}

const renderSubscribers = (subscribers) => {
    // TODO -- paginate subscribers
    if(subscribers.doing) return <Loading />
    if(subscribers.noResults) return (<em>This list has no subscribers.</em>)

    return (
        <ul>
            {subscribers.data.map(renderSubscriber)}
        </ul>
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
                    <td>{renderSubscribers(subscribers)}</td>
                </tr>
            </tbody>
        </table>
    )
}
