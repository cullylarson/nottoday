import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { saveLastPageLocation } from './actions'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        saveLastPageLocation,
    }, dispatch),
})

// remembers the lastPageLocation visited (so you can go back if you want)
class LastPage extends Component {
    componentWillReceiveProps(nextProps) {
        // blacklisted
        if(this.props.blacklist && this.props.blacklist.includes(this.props.location)) return

        this.props.actions.saveLastPageLocation(this.props.location) // this.props.location holds the current location, before the history action happens
    }

    render() {
        return this.props.children
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LastPage))
