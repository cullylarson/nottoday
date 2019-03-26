import React, { Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { title } from '@app/lib/title'

export default () => {
    return (
        <DocumentTitle title={title()}>
            <Fragment>
                <h1>Login</h1>

                <p><a href='/auth/twitter' className='btn'>Login with Twitter</a></p>
            </Fragment>
        </DocumentTitle>
    )
}
