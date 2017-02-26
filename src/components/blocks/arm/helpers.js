export const sweepTo = [
    'void sweepTo(Servo servo, int desiredAngle) {',
    '  int currentAngle = servo.read();',
    '  while(currentAngle != desiredAngle) {',
    '    if (currentAngle < desiredAngle) {',
    '      currentAngle = currentAngle + 1;',
    '    } else {',
    '      currentAngle = currentAngle - 1;',
    '    }',
    '    servo.write(currentAngle);',
    '    delay(10);',
    '  }',
    '}'
];

export function createConstrainedAngleField(initial, minAngle, maxAngle) {
    const constrainAngle = function (proposedAngle) {
        const intAngle = parseInt(proposedAngle, 10);
        if (intAngle >= maxAngle) {
            return maxAngle;
        } else if (intAngle <= minAngle) {
            return minAngle;
        }
        return intAngle;
    };
    return new Blockly.FieldAngle(initial.toString(), constrainAngle);
}
