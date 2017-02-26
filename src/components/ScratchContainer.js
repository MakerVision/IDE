import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ScratchActions from '../actions/scratch';
import * as NotificationActions from '../actions/notifications';
import Scratch from './Scratch';

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, ScratchActions, NotificationActions);
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        scratch: state.scratch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scratch);
