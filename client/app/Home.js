import React, { Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { title } from '@app/lib/title'

export default () => {
    return (
        <DocumentTitle title={title()}>
            <Fragment>
                <h1>Home</h1>
            </Fragment>
        </DocumentTitle>
    )
}
