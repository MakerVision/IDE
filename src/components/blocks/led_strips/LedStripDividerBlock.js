import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';
import hexRgb from 'hex-rgb';

const divideLedStripFunction = [
    'void divideLedStrip!!pinNumber!!(rgb_color leftColor, rgb_color rightColor, int ledCount, int divideAtIndex) {', // eslint-disable-line
    '  PololuLedStrip<!!pinNumber!!> ledStrip;',
    '  rgb_color colors[ledCount];',
    '',
    '  for(uint16_t i = 0; i < divideAtIndex; i++)',
    '  {',
    '    colors[i] = leftColor;',
    '  }',
    '  for(uint16_t i = divideAtIndex; i < ledCount; i++)',
    '  {',
    '    colors[i] = rightColor;',
    '  }',
    '',
    '  ledStrip.write(colors, ledCount);',
    '}',
];

class LedStripProgressBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="led_strip_divider">
                <value name="DIVIDE_AT">
                    <block type="math_number">
                        <field name="NUM">30</field>
                    </block>
                </value>
            </block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Use this to control an RGB LED strip, lighting from the start toward the end.';
    Blockly.Blocks.led_strip_divider = {
        init: function init() {
            this.appendDummyInput()
                .appendField('led strip color divider');
            this.appendDummyInput()
                 .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('on pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'PIN_NUMBER');
            this.appendDummyInput()
                 .setAlign(Blockly.ALIGN_RIGHT)
                 .appendField('number of pixels')
                 .appendField(new Blockly.FieldNumberRange(60, 1, 200), 'PIXEL_COUNT');
            this.appendValueInput('DIVIDE_AT')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('switch colors at pixel number:');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('first color')
                .appendField(new Blockly.FieldColour('#00ff00'), 'FIRST_COLOR');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('second color')
                .appendField(new Blockly.FieldColour('#000000'), 'SECOND_COLOR');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField('(Mokungit 60px LED Strip)');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(color.green);
            this.setTooltip(tooltip);
            // this.setHelpUrl('http://www.example.com/');
        }
    };
    Blockly.C.led_strip_divider = function ledStripDivider(block) {
        const pinNumber = block.getFieldValue('PIN_NUMBER');
        const firstColor = rgbString(hexRgb(block.getFieldValue('FIRST_COLOR')));
        const secondColor = rgbString(hexRgb(block.getFieldValue('SECOND_COLOR')));
        const pixelCount = block.getFieldValue('PIXEL_COUNT');
        const divideAtIndex = Blockly.C.valueToCode(block, 'DIVIDE_AT',
            Blockly.C.ORDER_NONE) || '1';
        block.includes = [ // eslint-disable-line no-param-reassign
            '#include <PololuLedStrip.h>'
        ];
        const divideLedStripForThisPin = divideLedStripFunction.map(
            (loc) => loc.replace('!!pinNumber!!', pinNumber)
        );
        Blockly.C.provideFunction_(`divideLedStripPin${pinNumber}`, divideLedStripForThisPin);
        return `divideLedStrip${pinNumber}(rgb_color ${firstColor}, rgb_color ${secondColor}, ${pixelCount}, ${divideAtIndex});\n`;  // eslint-disable-line
    };
}

function rgbString(colorArray) {
    return `{${colorArray[0]},${colorArray[1]},${colorArray[2]}}`;
}

export default LedStripProgressBlock;
