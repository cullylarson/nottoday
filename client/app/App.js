import React, { Suspense, lazy, Fragment } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import NavigateLoader from '@app/components/NavigateLoader'
import ScrollTop from '@app/components/ScrollTop'
import Loading from '@app/components/Loading'
import CheckAuth from '@app/components/CheckAuth'
import LastPage from '@app/the-history/LastPage'
import rootLoadActions from '@app/root-load-actions'
import { title } from '@app/lib/title'

import './style/app.css'

const Layout = lazy(() => import('./Layout'))
const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'))
const MemberLists = lazy(() => import('@app/member-list/MemberLists'))

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
                                    <Route path='/member-list' component={MemberLists} />
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
