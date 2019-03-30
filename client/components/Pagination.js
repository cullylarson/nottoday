import { liftA, isFunction } from '@cullylarson/f'
import React from 'react'
import { Link } from 'react-router-dom'
import { classnames } from '@client/lib/classes'

import './style/pagination.css'

const cursorSet = cursor => cursor !== '0' && cursor

const renderLink = (cursor, classNames, title, urlTemplate) => {
    cursor = cursorSet(cursorSet) ? cursor : null
    classNames = liftA(classNames)

    if(isFunction(urlTemplate)) {
        const url = urlTemplate(cursor)
        return <Link className={classNames} to={url}>{title}</Link>
    }
    else {
        const url = urlTemplate.replace('{{p}}', cursor)
        return <Link className={classNames} to={url}>{title}</Link>
    }
}

const renderPrev = (previousCursor, urlTemplate) => {
    const classNames = classnames(['prev', cursorSet(previousCursor) ? 'have-prev' : 'no-prev'])

    return (<li key='prev'>{renderLink(previousCursor, classNames, <span>&laquo;</span>, urlTemplate)}</li>)
}

const renderNext = (nextCursor, urlTemplate) => {
    const classNames = classnames(['next', cursorSet(nextCursor) ? 'have-next' : 'no-next'])

    return (<li key='next'>{renderLink(nextCursor, classNames, <span>&raquo;</span>, urlTemplate)}</li>)
}

export default ({ nextCursor, previousCursor, urlTemplate }) => {
    if(!cursorSet(nextCursor) && !cursorSet(previousCursor)) return ''

    return (
        <ul className='pagination'>
            {renderPrev(previousCursor, urlTemplate)}
            {renderNext(nextCursor, urlTemplate)}
        </ul>
    )
}
