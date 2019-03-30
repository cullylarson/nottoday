import React, { Suspense, lazy, Fragment } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import NavigateLoader from '@client/components/NavigateLoader'
import ScrollTop from '@client/components/ScrollTop'
import Loading from '@client/components/Loading'
import CheckAuth from '@client/components/CheckAuth'
import LastPage from '@client/the-history/LastPage'
import rootLoadActions from '@client/root-load-actions'
import { title } from '@client/lib/title'

import './style/app.css'

const Layout = lazy(() => import('./Layout'))
const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'))
const MemberListsList = lazy(() => import('@client/member-list/MemberListsList'))

const NotFound = () => {
    return (
        <DocumentTitle title={title('Page Not Found')}>
            <Fragment>
                <h1>404</h1>

                <p>Page not found.</p>
            </Fragment>
        </DocumentTitle>
    )
}

const App = () => {
    return (
        <Router>
            <NavigateLoader loadActions={rootLoadActions}>
                <CheckAuth />
                <ScrollTop>
                    <LastPage blacklist={['/auth/twitter', '/auth/twitter/callback', '/login']}>
                        <Suspense fallback={<Loading />}>
                            <Layout>
                                <Switch>
                                    <Route path='/member-list' component={MemberListsList} />
                                    <Route path='/member-list/p/:cursor' component={MemberListsList} />
                                    <Route path='/login' component={Login} />
                                    <Route exact path='/' component={Home} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Layout>
                        </Suspense>
                    </LastPage>
                </ScrollTop>
            </NavigateLoader>
        </Router>
    )
}

export default App
