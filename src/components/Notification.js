import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Notification extends React.Component {
    getIconFor(key) {
        if (key === 'SUCCESS') {
            return (
                <i
                    style={{ color: 'Green', fontSize: '28px' }}
                    className="fa fa-check"
                ></i>
            );
        }
        if (key === 'ERROR') {
            return (
                <i
                    style={{ color: 'Red', fontSize: '28px' }}
                    className="fa fa-check"
                ></i>
            );
        }
    }
    render() {
        const content = (
            <span>
                {this.getIconFor(this.props.icon)}
                &nbsp;
                {this.props.content}
            </span>
        );
        return (
            <Snackbar
                open={this.props.visible}
                message={content}
                onRequestClose={() => { this.props.notificationClose(); }}
            />
        );
    }
}

Notification.propTypes = {
    visible: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    icon: PropTypes.string,
    notificationClose: PropTypes.func.isRequired
};

export default Notification;
