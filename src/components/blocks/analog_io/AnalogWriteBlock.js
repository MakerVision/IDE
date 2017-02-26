import React from 'react';
import color from '../../../colors';
import { PWM_PINS } from '../../../arduino';

class AnalogWriteBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="analog_write"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Writes a an analog value (0-255) to a PWM pin.';
    Blockly.Blocks.analog_write = {
        init: function init() {
            this.appendDummyInput()
                .appendField('analog write pin')
                .appendField(new Blockly.FieldDropdown(PWM_PINS), 'PIN_NUMBER')
                .appendField('to')
                .appendField(new Blockly.FieldNumberRange(0, 0, 255), 'VALUE');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.green);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/AnalogWrite');
        }
    };
    Blockly.C.analog_write = function digitalWrite(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const pinValue = block.getFieldValue('VALUE');
        const code = `analogWrite(${pinNumber}, ${pinValue});\n`;
        return code;
    };
}

export default AnalogWriteBlock;
