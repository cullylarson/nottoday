import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import Loading from '@client/components/Loading'
import Pagination from '@client/components/Pagination'
import Messages from '@client/components/Messages'
import { title } from '@client/lib/title'

const mapStateToProps = ({ memberList }) => ({
    memberList,
})

const mapDispatchToProps = (dispatch) => ({})

const renderOne = (list) => {
    const renderLink = () => {
        return list.mode === 'private'
            ? `${list.name} (Private)`
            : (<Link to={`/list/${list.id_str}`}>{list.name}</Link>)
    }

    return (
        <tr key={list.id_str}>
            <td>{renderLink()}</td>
            <td><Link to={`/user/${list.user.id_str}`}>{'@' + list.user.screen_name}</Link></td>
        </tr>
    )
}

const renderAll = (memberList) => {
    if(memberList.list.doing) return <Loading />
    if(memberList.list.noResults) return <p><em>You are not a member of any lists.</em></p>

    return (
        <table className='accounts-list'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Owner</th>
                </tr>
            </thead>
            <tbody>
                {memberList.list.lists.map(renderOne)}
            </tbody>
        </table>
    )
}

const MemberListsList = ({ memberList }) => {
    return (
        <DocumentTitle title={title('Member Lists')}>
            <Fragment>
                <h1>Member Lists</h1>

                <Messages error={memberList.list.errors} />

                {renderAll(memberList)}

                <Pagination
                    nextCursor={memberList.list.nextCursor}
                    previousCursor={memberList.list.previousCursor}
                    urlTemplate={x => x && x !== '-1' && x !== -1 && x !== '0' ? `/member-list/p/${x}` : '/member-list'}
                />
            </Fragment>
        </DocumentTitle>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListsList)
