import React from 'react';
import color from '../../../colors';

class GetNumberBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="get_number"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Gets the value of a number variable';
    Blockly.Blocks.get_number = {
        init: function init() {
            this.appendDummyInput()
                .appendField('get number')
                .appendField(new Blockly.FieldTextInput('myNumber'), 'NAME');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            // this.setHelpUrl('https://www.arduino.cc/en/Reference/ServoRead');
        }
    };
    Blockly.C.get_number = function servoRead(block) {
        const variableName = block.getFieldValue('NAME');
        const code = `${variableName}`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default GetNumberBlock;
