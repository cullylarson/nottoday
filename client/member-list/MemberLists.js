import React, { Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { title } from '@client/lib/title'

export default () => {
    return (
        <DocumentTitle title={title('Member Lists')}>
            <Fragment>
                <h1>Member Lists</h1>
            </Fragment>
        </DocumentTitle>
    )
}
