import React from 'react';

class RotateSetupBlock extends React.Component {
    componentWillMount() {
        defineBlock(this.props, this.state);
    }
    render() {
        return (
            <block type={this.props.type}></block>
        );
    }
}

RotateSetupBlock.propTypes = {
    type: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    pinName: React.PropTypes.string.isRequired,
    pinNumber: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
};

function defineBlock(props) {
    Blockly.Blocks[props.type] = {
        init: function init() {
            this.appendDummyInput()
                .appendField(`set up ${props.name}`);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(props.color);
            this.setTooltip(props.tooltip);
        }
    };
    Blockly.C[props.type] = function servoSetup(block) {
        const variableName = props.pinName;
        block.includes = [ // eslint-disable-line no-param-reassign
            '#include <Servo.h>'
        ];
        block.variables = [ // eslint-disable-line no-param-reassign
            { name: variableName, type: 'Servo' }
        ];
        const code = `${variableName}.attach(${props.pinNumber});\n`;
        return code;
    };
}

export default RotateSetupBlock;
