import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TopToolbarActions from '../actions/scratch';
import * as NotificationActions from '../actions/notifications';
import TopToolbar from './TopToolbar';

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, TopToolbarActions, NotificationActions);
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);
