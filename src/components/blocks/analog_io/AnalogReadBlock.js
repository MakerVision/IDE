import React from 'react';
import color from '../../../colors';
import { ANALOG_INPUT_PINS } from '../../../arduino';

class AnalogReadBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="analog_read"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Read an analog value (0-1023) from an analog pin (0-5).';
    Blockly.Blocks.analog_read = {
        init: function init() {
            this.appendDummyInput()
                .appendField('analog read from Pin')
                .appendField(new Blockly.FieldDropdown(ANALOG_INPUT_PINS), 'PIN_NUMBER');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/AnalogRead');
        }
    };
    Blockly.C.analog_read = function analogRead(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const code = `analogRead(${pinNumber})`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default AnalogReadBlock;
