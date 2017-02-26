/* eslint-disable */
export default function procedures() {
  Blockly.C['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    const funcName = Blockly.C.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    let branch = Blockly.C.statementToCode(block, 'STACK');
    if (Blockly.C.STATEMENT_PREFIX) {
      branch = Blockly.C.prefixLines(
          Blockly.C.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + block.id + '\''), Blockly.C.INDENT) + branch;
    }
    if (Blockly.C.INFINITE_LOOP_TRAP) {
      branch = Blockly.C.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    let returnValue = Blockly.C.valueToCode(block, 'RETURN',
        Blockly.C.ORDER_NONE) || '';
    if (returnValue) {
      returnValue = '  return ' + returnValue + ';\n';
    }
    const args = [];
    for (let i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.C.variableDB_.getName(block.arguments_[i],
          Blockly.Variables.NAME_TYPE);
    }
    let code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.C.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.C.definitions_['%' + funcName] = code;
    return null;
  };

  // Defining a procedure without a return value uses the same generator as
  // a procedure with a return value.
  Blockly.C['procedures_defnoreturn'] =
      Blockly.C['procedures_defreturn'];

  Blockly.C['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    const funcName = Blockly.C.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    const args = [];
    for (let i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.C.valueToCode(block, 'ARG' + i,
          Blockly.C.ORDER_COMMA) || 'null';
    }
    const code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    const funcName = Blockly.C.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    const args = [];
    for (let i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.C.valueToCode(block, 'ARG' + i,
          Blockly.C.ORDER_COMMA) || 'null';
    }
    const code = funcName + '(' + args.join(', ') + ');\n';
    return code;
  };


  Blockly.C['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    const condition = Blockly.C.valueToCode(block, 'CONDITION',
        Blockly.C.ORDER_NONE) || 'false';
    let code = 'if (' + condition + ') {\n';
    if (block.hasReturnValue_) {
      const value = Blockly.C.valueToCode(block, 'VALUE',
          Blockly.C.ORDER_NONE) || 'null';
      code += '  return ' + value + ';\n';
    } else {
      code += '  return;\n';
    }
    code += '}\n';
    return code;
  };
}
