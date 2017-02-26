import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class DigitalWriteBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="digital_write"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Write a HIGH or a LOW value to a digital pin.';
    Blockly.Blocks.digital_write = {
        init: function init() {
            this.appendDummyInput()
            .appendField('turn pin')
            .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER')
            .appendField(new Blockly.FieldDropdown([['ON', 'HIGH'], ['OFF', 'LOW']]), 'VALUE');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.green);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/DigitalWrite');
        }
    };
    Blockly.C.digital_write = function digitalWrite(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const highLow = block.getFieldValue('VALUE');
        const code = `digitalWrite(${pinNumber}, ${highLow});\n`;
        return code;
    };
}

export default DigitalWriteBlock;
