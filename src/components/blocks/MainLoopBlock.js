import React from 'react';
import color from '../../colors';

class MainLoopBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="main_loop"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'The blocks inside the loop will be run over and over again.';
    Blockly.Blocks.main_loop = {
        init: function init() {
            this.appendStatementInput('statements')
            .setCheck(null)
            .appendField('loop');
            this.setPreviousStatement(true, 'foo');
            this.setColour(color.orange);
            this.setTooltip(tooltip);
            this.setHelpUrl('https://www.arduino.cc/en/Reference/Loop');
            this.setDeletable(false);
        }
    };

    Blockly.C.main_loop = function mainLoop(block) {
        const statements = Blockly.C.statementToCode(block, 'statements');
        const code = `void loop() {\n${statements}}\n`;
        return code;
    };
}

export default MainLoopBlock;
