/* eslint-disable */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './components/AppContainer';
import HomePageContainer from './components/HomePageContainer';
import NotFoundPage from './components/NotFoundPage';


export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={HomePageContainer} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
