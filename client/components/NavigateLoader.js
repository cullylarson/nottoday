import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { doLoadActions } from '@app/lib/load-actions'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    dispatch,
})

// loads data depending on the route, on intial app load and on goBack and goForward
class NavigateLoader extends Component {
    componentWillMount() {
        const doActions = (location) => doLoadActions(this.props.dispatch, location.pathname, location.search, this.props.loadActions)

        // on load
        doActions(this.props.location)

        this.props.history.listen((location, action) => {
            if(action === 'POP' || action === 'PUSH' || action === 'REPLACE') {
                this.props.dispatch({
                    type: 'LOCATION_CHANGED',
                    action,
                })

                doActions(location)
            }
        })
    }

    render() {
        return this.props.children
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigateLoader))
