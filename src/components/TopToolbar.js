import React, { PropTypes } from 'react';
import Auth from './Auth';
import colors from '../colors';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

import styles from './TopToolbar.css';

const TopToolbar = (props) => (
    <Toolbar className={styles.toolbar}>
        <ToolbarGroup>
            <span className={styles.title} style={{ color: 'white' }}>
                MakerVision
            </span>
            &nbsp;
            <span className={styles.title} style={{ color: colors.accent }}>
                IDE
            </span>
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                label="Reset"
                icon={<FontIcon className="fa fa-bomb" color="white" />}
                backgroundColor={colors.red}
                labelColor="white"
                onTouchTap={props.workspaceReset}
            />
            <RaisedButton
                label="Copy Code"
                secondary
                icon={<FontIcon className="fa fa-copy" color="white" />}
                onTouchTap={props.copyCode}
            />
            <Auth />
        </ToolbarGroup>
    </Toolbar>
);

TopToolbar.propTypes = {
    workspaceReset: PropTypes.func.isRequired,
    copyCode: PropTypes.func.isRequired
};

export default TopToolbar;
