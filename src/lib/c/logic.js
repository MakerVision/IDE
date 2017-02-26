/* eslint-disable */

export default function logic() {
'use strict';

Blockly.C['controls_if'] = function(block) {
  // If/elseif/else condition.
  const n = 0;
  let argument = Blockly.C.valueToCode(block, 'IF' + n,
      Blockly.C.ORDER_NONE) || 'false';
  let branch = Blockly.C.statementToCode(block, 'DO' + n);
  let code = 'if (' + argument + ') {\n' + branch + '}';
  for (let n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.C.valueToCode(block, 'IF' + n,
        Blockly.C.ORDER_NONE) || 'false';
    branch = Blockly.C.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.C.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.C['logic_compare'] = function(block) {
  // Comparison operator.
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  const operator = OPERATORS[block.getFieldValue('OP')];
  const order = (operator == '==' || operator == '!=') ?
      Blockly.C.ORDER_EQUALITY : Blockly.C.ORDER_RELATIONAL;
  const argument0 = Blockly.C.valueToCode(block, 'A', order) || '0';
  const argument1 = Blockly.C.valueToCode(block, 'B', order) || '0';
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.C['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  const operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  const order = (operator == '&&') ? Blockly.C.ORDER_LOGICAL_AND :
      Blockly.C.ORDER_LOGICAL_OR;
  let argument0 = Blockly.C.valueToCode(block, 'A', order);
  let argument1 = Blockly.C.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    const defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.C['logic_negate'] = function(block) {
  // Negation.
  const order = Blockly.C.ORDER_LOGICAL_NOT;
  const argument0 = Blockly.C.valueToCode(block, 'BOOL', order) ||
      'true';
  const code = '!' + argument0;
  return [code, order];
};

Blockly.C['logic_boolean'] = function(block) {
  // Boolean values true and false.
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.C.ORDER_ATOMIC];
};

Blockly.C['logic_null'] = function(/* block */) {
  // Null data type.
  return ['null', Blockly.C.ORDER_ATOMIC];
};

Blockly.C['logic_ternary'] = function(block) {
  // Ternary operator.
  const value_if = Blockly.C.valueToCode(block, 'IF',
      Blockly.C.ORDER_CONDITIONAL) || 'false';
  const value_then = Blockly.C.valueToCode(block, 'THEN',
      Blockly.C.ORDER_CONDITIONAL) || 'null';
  const value_else = Blockly.C.valueToCode(block, 'ELSE',
      Blockly.C.ORDER_CONDITIONAL) || 'null';
  const code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.C.ORDER_CONDITIONAL];
};
}
