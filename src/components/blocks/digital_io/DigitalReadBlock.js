import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class DigitalReadBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="digital_read"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Read a HIGH or a LOW value from a digital pin.';
    Blockly.Blocks.digital_read = {
        init: function init() {
            this.appendDummyInput()
                .appendField('Digital read from Pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            this.setHelpUrl('http://www.example.com/');
            this.setHelpUrl('https://www.arduino.cc/en/Reference/DigitalRead');
        }
    };
    Blockly.C.digital_read = function digitalRead(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const code = `digitalRead(${pinNumber})`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default DigitalReadBlock;
