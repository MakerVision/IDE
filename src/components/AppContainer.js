import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import TopToolbarContainer from '../components/TopToolbarContainer';
// import Television from '../components/tv/Television';  --Wip

import NotificationContainer from '../components/NotificationContainer';

class AppContainer extends Component {
    render() {
        return (
            <div className="fill-parent">
                <ReactTooltip class="tooltip" />
                <TopToolbarContainer />
                {this.props.children}
                <NotificationContainer />
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.element.isRequired
};

export default AppContainer;
