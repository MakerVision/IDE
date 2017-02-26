/* eslint-disable */
export default function loops() {

  Blockly.C['controls_repeat_ext'] = function(block) {
    // Repeat n times.
    let repeats = '';
    if (block.getField('TIMES')) {
      // Internal number.
      repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
      // External number.
      repeats = Blockly.C.valueToCode(block, 'TIMES',
          Blockly.C.ORDER_ASSIGNMENT) || '0';
    }
    let branch = Blockly.C.statementToCode(block, 'DO');
    branch = Blockly.C.addLoopTrap(branch, block.id);
    let code = '';
    const loopVar = Blockly.C.variableDB_.getDistinctName(
        'count', Blockly.Variables.NAME_TYPE);
    const endVar = repeats;
    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
      const endVar = Blockly.C.variableDB_.getDistinctName(
          'repeat_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (int ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' +
        branch + '}\n';
    return code;
  };

  Blockly.C['controls_repeat'] =
      Blockly.C['controls_repeat_ext'];

  Blockly.C['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    const until = block.getFieldValue('MODE') == 'UNTIL';
    let argument0 = Blockly.C.valueToCode(block, 'BOOL',
        until ? Blockly.C.ORDER_LOGICAL_NOT :
        Blockly.C.ORDER_NONE) || 'false';
    let branch = Blockly.C.statementToCode(block, 'DO');
    branch = Blockly.C.addLoopTrap(branch, block.id);
    if (until) {
      argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
  };

  Blockly.C['controls_for'] = function(block) {
    // For loop.
    const variable0 = Blockly.C.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const argument0 = Blockly.C.valueToCode(block, 'FROM',
        Blockly.C.ORDER_ASSIGNMENT) || '0';
    const argument1 = Blockly.C.valueToCode(block, 'TO',
        Blockly.C.ORDER_ASSIGNMENT) || '0';
    const increment = Blockly.C.valueToCode(block, 'BY',
        Blockly.C.ORDER_ASSIGNMENT) || '1';
    let branch = Blockly.C.statementToCode(block, 'DO');
    branch = Blockly.C.addLoopTrap(branch, block.id);
    let code;
    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
        Blockly.isNumber(increment)) {
      // All arguments are simple numbers.
      const up = parseFloat(argument0) <= parseFloat(argument1);
      code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
          variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
          variable0;
      const step = Math.abs(parseFloat(increment));
      if (step == 1) {
        code += up ? '++' : '--';
      } else {
        code += (up ? ' += ' : ' -= ') + step;
      }
      code += ') {\n' + branch + '}\n';
    } else {
      code = '';
      // Cache non-trivial values to variables to prevent repeated look-ups.
      let startVar = argument0;
      if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
        startVar = Blockly.C.variableDB_.getDistinctName(
            variable0 + '_start', Blockly.Variables.NAME_TYPE);
        code += 'var ' + startVar + ' = ' + argument0 + ';\n';
      }
      let endVar = argument1;
      if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
        endVar = Blockly.C.variableDB_.getDistinctName(
            variable0 + '_end', Blockly.Variables.NAME_TYPE);
        code += 'var ' + endVar + ' = ' + argument1 + ';\n';
      }
      // Determine loop direction at start, in case one of the bounds
      // changes during loop execution.
      let incVar = Blockly.C.variableDB_.getDistinctName(
          variable0 + '_inc', Blockly.Variables.NAME_TYPE);
      code += 'var ' + incVar + ' = ';
      if (Blockly.isNumber(increment)) {
        code += Math.abs(increment) + ';\n';
      } else {
        code += 'Math.abs(' + increment + ');\n';
      }
      code += 'if (' + startVar + ' > ' + endVar + ') {\n';
      code += Blockly.C.INDENT + incVar + ' = -' + incVar + ';\n';
      code += '}\n';
      code += 'for (' + variable0 + ' = ' + startVar + '; ' +
          incVar + ' >= 0 ? ' +
          variable0 + ' <= ' + endVar + ' : ' +
          variable0 + ' >= ' + endVar + '; ' +
          variable0 + ' += ' + incVar + ') {\n' +
          branch + '}\n';
    }
    return code;
  };

  Blockly.C['controls_forEach'] = function(block) {
    // For each loop.
    const variable0 = Blockly.C.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const argument0 = Blockly.C.valueToCode(block, 'LIST',
        Blockly.C.ORDER_ASSIGNMENT) || '[]';
    let branch = Blockly.C.statementToCode(block, 'DO');
    branch = Blockly.C.addLoopTrap(branch, block.id);
    let code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    let listVar = argument0;
    if (!argument0.match(/^\w+$/)) {
      listVar = Blockly.C.variableDB_.getDistinctName(
          variable0 + '_list', Blockly.Variables.NAME_TYPE);
      code += 'var ' + listVar + ' = ' + argument0 + ';\n';
    }
    const indexVar = Blockly.C.variableDB_.getDistinctName(
        variable0 + '_index', Blockly.Variables.NAME_TYPE);
    branch = Blockly.C.INDENT + variable0 + ' = ' +
        listVar + '[' + indexVar + '];\n' + branch;
    code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
    return code;
  };

  Blockly.C['controls_flow_statements'] = function(block) {
    // Flow statements: continue, break.
    switch (block.getFieldValue('FLOW')) {
      case 'BREAK':
        return 'break;\n';
      case 'CONTINUE':
        return 'continue;\n';
    }
    throw 'Unknown flow statement.';
  };
}
