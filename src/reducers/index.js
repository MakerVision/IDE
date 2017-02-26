import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import scratch from './scratch';
import notifications from './notifications';

const rootReducer = combineReducers({
    scratch: scratch,
    routing: routerReducer,
    notifications: notifications,
});

export default rootReducer;
