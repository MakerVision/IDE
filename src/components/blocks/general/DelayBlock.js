import React from 'react';
import color from '../../../colors';

class DelayBlock extends React.Component {
    componentWillMount() {
        const tooltip = 'Pauses the program for an amount of time.';

        Blockly.Blocks.delay = {
            init: function init() {
                this.appendValueInput('SECONDS')
                    .setCheck('Number')
                    .appendField('wait for');
                this.appendDummyInput()
                    .appendField('seconds');
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(color.purple);
                this.setTooltip(tooltip);
                this.setHelpUrl('https://www.arduino.cc/en/Reference/Delay');
            }
        };
        Blockly.C.delay = function delay(block) {
            const ms =
                Blockly.C.valueToCode(block, 'SECONDS', Blockly.C.ORDER_ATOMIC) * 1000
                || '0';
            const code = `delay(${ms}); /* ${ms} milliseconds */\n`;
            return code;
        };
    }
    render() {
        return (
            <block type="delay">
                <value name="SECONDS">
                    <block type="math_number">
                        <field name="NUM">1.0</field>
                    </block>
                </value>
            </block>
        );
    }
}

export default DelayBlock;
