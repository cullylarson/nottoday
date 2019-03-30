import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import Loading from '@client/components/Loading'
import Pagination from '@client/components/Pagination'
import Messages from '@client/components/Messages'
import { title } from '@client/lib/title'

import './style/list.css'

const mapStateToProps = ({ memberList }) => ({
    memberList,
})

const mapDispatchToProps = (dispatch) => ({})

const renderOne = (list, key) => {
    return (
        <div className='item' key={key}>
            <div className='name'><Link to={`/list/${list.id_str}`}>{list.name}</Link></div>
            <div className='owner'><Link to={`/user/${list.user.id_str}`}>{'@' + list.user.screen_name}</Link></div>
        </div>
    )
}

const renderAll = (memberList) => {
    if(memberList.list.doing) return <Loading />
    if(memberList.list.noResults) return <p><em>You are not a member of any lists.</em></p>

    return (
        <div className='list'>
            {memberList.list.lists.map(renderOne)}
        </div>
    )
}

const MemberListsList = ({ memberList }) => {
    return (
        <DocumentTitle title={title('Member Lists')}>
            <div className='member-lists-list'>
                <h1>Member Lists</h1>

                <Messages error={memberList.list.errors} />

                {renderAll(memberList)}

                <Pagination
                    nextCursor={memberList.list.nextCursor}
                    previousCursor={memberList.list.previousCursor}
                    urlTemplate={x => x && x !== '-1' && x !== -1 && x !== '0' ? `/member-list/p/${x}` : '/member-list'}
                />
            </div>
        </DocumentTitle>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListsList)
