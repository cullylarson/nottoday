import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '@client/components/Loading'
import Messages from '@client/components/Messages'
import ListOneTable from './ListOneTable'

const mapStateToProps = ({ list }) => ({
    list,
})

const mapDispatchToProps = (dispatch) => ({})

const ListView = ({ list, actions }) => {
    const renderList = (theList) => {
        if(list.one.doing) return <Loading />
        if(!theList) return ''

        return (
            <Fragment>
                <ListOneTable list={theList} />

                <div className='actions'>
                    <Link className='btn' to={'/member-list'}>&laquo; Back to Member Lists</Link>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>List</h1>

            <Messages error={list.one.errors} />

            {renderList(list.one.list)}
        </Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
