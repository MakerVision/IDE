import React from 'react';
import color from '../../colors';

class SetupBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="setup"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'The setup() function is once called when a sketch starts.';
    Blockly.Blocks.setup = {
        init: function init() {
            this.appendStatementInput('statements')
                .setCheck(null)
                .appendField('setup');
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(color.lightBlue);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/Setup');
            this.setDeletable(false);
        }
    };
    Blockly.C.setup = function setup(block) {
        const statements = Blockly.C.statementToCode(block, 'statements');
        const blockSetup = Blockly.C.allSetup().join('\n');
        const code = `void setup() {\n  Serial.begin(9600);\n${statements}${blockSetup}\n}\n\n`;
        return code;
    };
}

export default SetupBlock;
