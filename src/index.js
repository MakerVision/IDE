/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico');
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactTooltip from 'react-tooltip';
import injectTapEventPlugin from 'react-tap-event-plugin';
import colors from './colors';
import ga from './ga';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
history.listen((location) => {
    setTimeout(ReactTooltip.rebuild, 0);
    const path = location.pathname;
    const pagename = path === '/' ? 'home' : path.replace('/', '');
    const url = document.location.href;
    ga('send', 'pageview', {
        title: pagename,
        location: url,
        page: path
    });
});


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: colors.primary,
        primary2Color: colors.primary2,
        // primary3Color: grey400,
        accent1Color: colors.accent,
        // accent2Color: grey100,
        // accent3Color: grey500,
        // textColor: darkBlack,
        // secondaryTextColor: fade(darkBlack, 0.54),
        // alternateTextColor: white,
        // canvasColor: white,
        // borderColor: grey300,
        // disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: colors.primary,
        // clockCircleColor: fade(darkBlack, 0.07),
        // shadowColor: fullBlack,
    },
    toolbar: {
        backgroundColor: colors.primary
    },
    spacing: {
        iconSize: '18px'
    }
});

render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);
