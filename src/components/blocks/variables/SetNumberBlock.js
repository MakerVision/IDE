import React from 'react';
import color from '../../../colors';

class SetNumberBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="set_number">
                <value name="VALUE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Sets an existing number variable';
    Blockly.Blocks.set_number = {
        init: function init() {
            this.appendValueInput('VALUE')
                .setCheck('Number')
                .appendField('set number')
                .appendField(new Blockly.FieldTextInput('myNumber'), 'NAME')
                .appendField('=');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.deepOrange);
            this.setTooltip(tooltip);
            // this.setHelpUrl('http://www.example.com/');
        }
    };
    Blockly.C.set_number = function servoRead(block) {
        const name = block.getFieldValue('NAME');
        const value =
            Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_ATOMIC)
            || '0';
        const code = `${name} = ${value};\n`;
        return code;
    };
}

export default SetNumberBlock;
