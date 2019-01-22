import React from 'react'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

import HomeComponent from '../containers/home.component'

const history = createBrowserHistory()
const AppRoutes = (
    <Router history={history} >
        <Switch>
            <Route path="/home" component={HomeComponent} />
            <Route component={HomeComponent} />
        </Switch>
    </Router>
)

export default AppRoutes