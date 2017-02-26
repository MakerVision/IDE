import { connect } from 'react-redux';
import HomePage from './HomePage';

function mapStateToProps(state) {
    return {
        loading: state.loading
    };
}

export default connect(mapStateToProps)(HomePage);
