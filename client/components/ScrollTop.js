import { Component } from 'react'
import { withRouter } from 'react-router'
import { scrollTop } from '@client/lib/scroll'

// scrolls to top of page on mount
class ScrollTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            scrollTop()
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollTop)
