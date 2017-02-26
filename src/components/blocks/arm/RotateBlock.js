/* eslint-disable no-underscore-dangle */
import React from 'react';
import { sweepTo, createConstrainedAngleField } from './helpers';

class RotateBlock extends React.Component {
    componentWillMount() {
        defineBlock(this.props);
    }
    render() {
        return (
            <block type={this.props.type}></block>
        );
    }
}

RotateBlock.propTypes = {
    type: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    pinName: React.PropTypes.string.isRequired,
    defaultAngle: React.PropTypes.number.isRequired,
    minAngle: React.PropTypes.number.isRequired,
    maxAngle: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
};

function defineBlock(props) {
    Blockly.Blocks[props.type] = {
        init: function init() {
            this.appendDummyInput()
                .appendField(`rotate ${props.name} to`)
                .appendField(createConstrainedAngleField(
                    props.defaultAngle, props.minAngle, props.maxAngle
                    ), 'ANGLE');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(props.color);
            this.setTooltip(props.tooltip);
        }
    };
    Blockly.C[props.type] = function (block) {
        Blockly.C.provideFunction_('sweepTo', sweepTo);
        const pinName = props.pinName;
        const angle = block.getFieldValue('ANGLE');
        const code = `sweepTo(${pinName}, ${angle});\n`;
        return code;
    };
}

export default RotateBlock;
