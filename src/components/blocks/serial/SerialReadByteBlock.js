import React from 'react';
import color from '../../../colors';

class SerialReadByteBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="serial_read_byte"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Reads the next byte from serial input';
    Blockly.Blocks.serial_read_byte = {
        init: function init() {
            this.appendDummyInput()
                .appendField('read next serial byte');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Serial/Read');
        }
    };
    Blockly.C.serial_read_byte = function serialRead() {
        const code = 'Serial.read()';
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default SerialReadByteBlock;
