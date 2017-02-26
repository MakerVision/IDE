import React from 'react';
import color from '../../../colors';

class RangeBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="range">
                <value name="MIN">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="MAX">
                    <block type="math_number">
                        <field name="NUM">10</field>
                    </block>
                </value>
            </block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Returns a range of a numbers.';
    Blockly.Blocks.range = {
        init: function init() {
            this.appendValueInput('MIN')
                .appendField('range')
                .setCheck('Number');
            this.appendValueInput('MAX')
                .setCheck('Number')
                .appendField('thru');
            this.setInputsInline(true);
            this.setOutput(true, 'RANGE');
            this.setColour(color.purple);
            this.setTooltip(tooltip);
            // this.setHelpUrl('http://www.example.com/');
        }
    };
    Blockly.C.range = function range(block) {
        const min = Blockly.C.valueToCode(block, 'MIN', Blockly.C.ORDER_ATOMIC) || '0';
        const max = Blockly.C.valueToCode(block, 'MAX', Blockly.C.ORDER_ATOMIC) || '0';
        const code = `${min}, ${max}`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default RangeBlock;
