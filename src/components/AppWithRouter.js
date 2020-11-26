import React from 'react';

import {BrowserRouter,Route,Switch,withRouter} from 'react-router-dom';
import withAnalytics,{initAnalytics} from 'react-with-analytics';

import HomePage from '../containers/homePage';
import registerPage from '../containers/registerPage';
import loginPage from "../containers/loginPage";
import discoverPage from '../containers/discoverPage';
import ProfilePage from '../containers/profilePage';
import followers from '../containers/followers';
import Followings from '../containers/followings';

const Root = () => (
    <Switch>
        <Route exact path ='/' component={HomePage} />
        <Route path ='/register' component={registerPage} />
        <Route path ='/login' component={loginPage} />
        <Route path ='/discover' component={discoverPage} />
        <Route path ='/profile/:id' component={ProfilePage} />
        <Route path ='/followers' component={followers} />
        <Route path ='/followings' component={Followings} />
        <Route component={HomePage} />
    </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () =>(
    <BrowserRouter >
        <App />
    </BrowserRouter>
);

export default AppWithRouter;