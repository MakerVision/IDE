/* eslint-disable dot-notation, camelcase, no-underscore-dangle */
export default function variables() {
    const NAME_TYPE = Blockly.Variables.NAME_TYPE;
    Blockly.C['variables_get'] = function variables_get(block) {
        // Variable getter.
        const code = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), NAME_TYPE);
        return [code, Blockly.C.ORDER_ATOMIC];
    };

    Blockly.C['variables_set'] = function variables_set(block) {
        // Variable setter.
        const argument0 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_ASSIGNMENT) || '0';
        const varName = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), NAME_TYPE);
        return `${varName} = ${argument0};\n`;
    };
}
