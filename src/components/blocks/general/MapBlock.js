import React from 'react';
import color from '../../../colors';

class MapBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    renderRange(min, max) {
        return (
            <block type="range">
                <value name="MIN">
                    <block type="math_number">
                        <field name="NUM">{min}</field>
                    </block>
                </value>
                <value name="MAX">
                    <block type="math_number">
                        <field name="NUM">{max}</field>
                    </block>
                </value>
            </block>
        );
    }
    render() {
        return (
            <block type="map">
                <value name="VALUE">
                    <block type="math_number">
                        <field name="NUM">5</field>
                    </block>
                </value>
                <value name="MIN">
                    {this.renderRange(0, 10)}
                </value>
                <value name="MAX">
                    {this.renderRange(0, 100)}
                </value>
            </block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Converts a value from an initial range to a proportional value in a new range';
    Blockly.Blocks.map = {
        init: function init() {
            this.appendValueInput('VALUE')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('convert');
            this.appendValueInput('MIN')
                .setCheck('RANGE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('from');
            this.appendValueInput('MAX')
                .setCheck('RANGE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('to');
            // this.setInputsInline(true);
            this.setOutput(true, null);
            this.setPreviousStatement(false, null);
            this.setNextStatement(false, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
        }
    };
    Blockly.C.map = function map(block) {
        const value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_ATOMIC) || '5';
        const min = Blockly.C.valueToCode(block, 'MIN', Blockly.C.ORDER_ATOMIC) || '0, 10';
        const max = Blockly.C.valueToCode(block, 'MAX', Blockly.C.ORDER_ATOMIC) || '0, 100';
        const code = `map(${value}, ${min}, ${max})`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default MapBlock;
