import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import browserHistory from '../api/history';
import {PrivateRoute, PublicRoute} from '../api/customRoutes';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFount from '../ui/NotFound';

//window.browserHistory = browserHistory

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
    if (isAuthenticated && isUnauthenticatedPage) { 
      browserHistory.replace('/dashboard')
    } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/')
    }
}

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <PublicRoute path="/" to="dashboard" exact component={Login}/>
      <PublicRoute path="/signup" to="/dashboard" component={Signup}/>
      <PrivateRoute path="/dashboard" to="/" component={Dashboard}/>
      <Route path="*" component={NotFount}/>
    </Switch>
  </Router>
);