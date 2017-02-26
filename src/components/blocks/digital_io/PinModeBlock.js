import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class DigitalWriteBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="pin_mode"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Configures the specified pin to behave as an input or an output.';
    Blockly.Blocks.pin_mode = {
        init: function init() {
            this.appendDummyInput()
            .appendField('make pin')
            .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER')
            .appendField('an')
            .appendField(new Blockly.FieldDropdown([['OUTPUT', 'OUTPUT'],
                ['INPUT', 'INPUT']]), 'VALUE');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.pink);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/PinMode');
        }
    };

    Blockly.C.pin_mode = function pinMode(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const direction = block.getFieldValue('VALUE');
        const code = `pinMode(${pinNumber}, ${direction});\n`;
        return code;
    };
}

export default DigitalWriteBlock;
