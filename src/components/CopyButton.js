import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './CopyButton.css';

class CopyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredTooltip: false
        };
    }
    render() {
        return (
            <div data-tip="Copy Code">
                <CopyToClipboard
                    text={this.props.text}
                    onCopy={this.props.onCopy.bind(this)}
                >
                    <FloatingActionButton
                        iconClassName="fa fa-content-copy"
                        secondary
                        className={styles.copyButton}
                        onMouseEnter={() => { this.setState({ hoveredTooltip: true }); }}
                        onMouseLeave={() => { this.setState({ hoveredTooltip: false }); }}
                        onClick={() => { this.props.notifySuccess('Copied!'); }}
                    />
                </CopyToClipboard>
            </div>
        );
    }
}

CopyButton.propTypes = {
    onCopy: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    notifySuccess: PropTypes.func.isRequired
};

export default CopyButton;
