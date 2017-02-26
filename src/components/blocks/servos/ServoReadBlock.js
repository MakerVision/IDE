import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class ServoReadBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="servo_read"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Read the current position of a servo.';
    Blockly.Blocks.servo_read = {
        init: function init() {
            this.appendDummyInput()
                .appendField('read position of servo')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/ServoRead');
        }
    };
    Blockly.C.servo_read = function servoRead(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const variableName = `servoPin${pinNumber}`;
        const code = `${variableName}.read()`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default ServoReadBlock;
