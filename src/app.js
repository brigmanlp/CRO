import {MasterPage, IndexPage} from './pages';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory } from 'react-router';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={MasterPage}>
            <IndexRoute component={IndexPage} />
        </Route>
    </Router>,
    document.getElementById('app-container')
);