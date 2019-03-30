import { liftA } from '@cullylarson/f'
import React, { Fragment } from 'react'
import { getMessage } from '@client/lib/messages'

import './style/messages.css'

export default ({ error, success }) => {
    error = liftA(error).filter(x => !!x)
    success = liftA(success).filter(x => !!x)

    const renderSet = (classNames, messages) => {
        return (
            <ul className={classNames}>
                {messages.map((x, i) => <li key={i}>{getMessage(x)}</li>)}
            </ul>
        )
    }

    return (
        <Fragment>
            {error && error.length ? renderSet('messages messages-error', error) : ''}
            {success && success.length ? renderSet('messages messages-success', success) : ''}
        </Fragment>
    )
}
