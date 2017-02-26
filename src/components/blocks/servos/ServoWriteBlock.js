import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';
import { sweepTo, createConstrainedAngleField } from './helpers';


class ServoWriteBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="servo_write"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Writes a value to a Servo Motor.';
    Blockly.Blocks.servo_write = {
        init: function init() {
            this.appendDummyInput()
                .appendField('move servo on pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER')
                .appendField('to')
                .appendField(createConstrainedAngleField(90, 0, 180), 'ANGLE');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.green);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/ServoWrite');
        }
    };
    Blockly.C.servo_write = function servoWrite(block) {
        Blockly.C.provideFunction_('sweepTo', sweepTo);
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const variableName = `servoPin${pinNumber}`;
        const angle = block.getFieldValue('ANGLE');
        const code = `sweepTo(${variableName}, ${angle});\n`;
        return code;
    };
}

export default ServoWriteBlock;
