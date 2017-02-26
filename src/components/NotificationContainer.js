import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NotificationActions from '../actions/notifications';
import Notification from '../components/Notification';


function mapDispatchToProps(dispatch) {
    return bindActionCreators(NotificationActions, dispatch);
}

function mapStateToProps(state) {
    return state.notifications;
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
