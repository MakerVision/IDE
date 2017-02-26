import React from 'react';
import color from '../../../colors';

class LowBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="low"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Constant representating a LOW value.';
    Blockly.Blocks.low = {
        init: function init() {
            this.appendDummyInput()
                .appendField('LOW');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            // this.setHelpUrl('https://www.arduino.cc/en/Reference/LOW');
        }
    };
    Blockly.C.low = function digitalWrite() {
        return ['LOW', Blockly.C.ORDER_ATOMIC];
    };
}

export default LowBlock;
