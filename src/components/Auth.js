import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService';
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

export class Auth extends React.Component {
    render() {
        if (auth.loggedIn()) {
            return (
                <span className={this.props.className}>
                    <a href="#" onClick={auth.logout.bind(this)}>Logout</a>
                </span>
            );
        }
        return (
            <span className={this.props.className}>
                <a
                    href="#"
                    onClick={auth.login.bind(this)}
                >
                    Login
                </a>
            </span>
        );
    }
}

Auth.propTypes = {
    className: T.string
};

export default Auth;
