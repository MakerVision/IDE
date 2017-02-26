import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class ServoSetupBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="servo_setup"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Configures a pin on your Arduino to control a Servo Motor.';
    Blockly.Blocks.servo_setup = {
        init: function init() {
            this.appendDummyInput()
                .appendField('configure pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER')
                .appendField('as a Servo');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.pink);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/DigitalWrite');
        }
    };
    Blockly.C.servo_setup = function servoSetup(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const variableName = `servoPin${pinNumber}`;
        block.variables = [ // eslint-disable-line no-param-reassign
            { name: variableName, type: 'Servo' }
        ];
        block.includes = [ // eslint-disable-line no-param-reassign
            '#include <Servo.h>'
        ];
        const code = `${variableName}.attach(${pinNumber});\n`;
        return code;
    };
}

export default ServoSetupBlock;
