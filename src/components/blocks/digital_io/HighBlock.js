import React from 'react';
import color from '../../../colors';

class HighBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="high"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Constant representating a HIGH value.';
    Blockly.Blocks.high = {
        init: function init() {
            this.appendDummyInput()
                .appendField('HIGH');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            // this.setHelpUrl('https://www.arduino.cc/en/Reference/HIGH');
        }
    };
    Blockly.C.high = function digitalWrite() {
        return ['HIGH', Blockly.C.ORDER_ATOMIC];
    };
}

export default HighBlock;
