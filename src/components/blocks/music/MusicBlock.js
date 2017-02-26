import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

class MusicBlock extends React.Component {
    componentWillMount() {
        Blockly.Blocks.music = {
            init: function init() {
                this.appendDummyInput()
                .appendField('prepare to play music on pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER');
                this.setPreviousStatement(false, null);
                this.setNextStatement(true, null);
                this.setColour(color.lightPurple);
                this.setTooltip('Gets us ready to play music!');
                // this.setHelpUrl('');
            }
        };
        Blockly.C.music = function digitalWrite(block) {
            const pinNumber = block.getFieldValue('PIN_NUMBER');
            const code = '' +
            `int musicPin = ${pinNumber};\n` +
            'void play(long frequency, long duration) {\n' +
            '  long delayValue = 1000000 / frequency / 2;\n' +
            '  long numCycles = frequency * duration / 1000;\n' +
            '  for (long i = 0; i < numCycles; i++) {\n' +
            '    digitalWrite(musicPin, HIGH);\n' +
            '    delayMicroseconds(delayValue);\n' +
            '    digitalWrite(musicPin, LOW);\n' +
            '    delayMicroseconds(delayValue);\n' +
            '  }\n' +
            '}\n';
            return code;
        };
    }
    render() {
        return (
            <block type="music"></block>
        );
    }
}

export default MusicBlock;
