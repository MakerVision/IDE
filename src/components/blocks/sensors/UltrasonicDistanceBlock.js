import React from 'react';
import color from '../../../colors';
import { DIGITAL_PINS } from '../../../arduino';

const firePulseFunction = [
    'void firePulse(int triggerPin) {',
    '  // Hold the trigger pin high for 10 us',
    '  digitalWrite(triggerPin, HIGH);',
    '  delayMicroseconds(10);',
    '  digitalWrite(triggerPin, LOW);',
    '}',
    '',
];

const measurePulseWidthIncmFunction = [
    'int measurePulseWidthIncm(int echoPin) {',
    '  unsigned long t1;',
    '  unsigned long t2;',
    '  unsigned long pulse_width;',
    '  int cm;',
    '',
    '  // Wait for pulse on echo pin',
    '  while (digitalRead(echoPin) == 0);',
    '',
    '  // Measure how long the echo pin was held high (pulse width)',
    '  t1 = micros();',
    '  while ( digitalRead(echoPin) == 1);',
    '  t2 = micros();',
    '  pulse_width = t2 - t1;',
    '',
    '  // Convert to centimeters, using the speed of sound.',
    '  cm = pulse_width / 58.0;',
    '  if (cm > 100 || cm < 0) { return 100; }  // Only reliable to 100cm',
    '  return cm;',
    '}',
    '',
];

const measureDistanceFunction = [
    'int measureDistanceWithUltrasonicSensor(int triggerPinNumber, int echoPinNumber) {',
    '  firePulse(triggerPinNumber);',
    '  return measurePulseWidthIncm(echoPinNumber);',
    '}',
    '',
];

class UltrasonicDistanceBlock extends React.Component {
    componentWillMount() {
        defineBlock();
    }
    render() {
        return (
            <block type="ultrasonic_distance"></block>
        );
    }
}

function defineBlock() {
    const tooltip = 'Use this with the HC-SR04 Ultrasonic Distance sensor.';
    Blockly.Blocks.ultrasonic_distance = {
        init: function init() {
            this.appendDummyInput()
                .appendField('get ultrasonic distance in centimeters ');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(' trigger pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'TRIGGER_PIN');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(' echo pin')
                .appendField(new Blockly.FieldDropdown(DIGITAL_PINS), 'ECHO_PIN');
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField('(HC-SR04)');
            this.setOutput(true, null);
            this.setColour(color.indigo);
            this.setTooltip(tooltip);
            // this.setHelpUrl('http://www.example.com/');
        }
    };
    Blockly.C.ultrasonic_distance = function ultrasonicDistance(block) {
        const triggerPinNumber = block.getFieldValue('TRIGGER_PIN');
        const echoPinNumber = block.getFieldValue('ECHO_PIN');
        Blockly.C.provideFunction_('firePulse', firePulseFunction);
        Blockly.C.provideFunction_('measurePulseWidthIncm', measurePulseWidthIncmFunction);
        Blockly.C.provideFunction_('measureDistanceWithUltrasonicSensor', measureDistanceFunction);
        Blockly.C.provideSetup_('distanceSensor', [
            `  pinMode(${triggerPinNumber}, OUTPUT);   // Distance Sensor Trigger`,
            `  digitalWrite(${triggerPinNumber}, LOW);    // Distance Sensor Trigger`,
        ]);
        const code = `measureDistanceWithUltrasonicSensor(${triggerPinNumber}, ${echoPinNumber})`;
        return [code, Blockly.C.ORDER_ATOMIC];
    };
}

export default UltrasonicDistanceBlock;
