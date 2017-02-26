/* eslint-disable */
export default function text() {
  'use strict';

  Blockly.C['text'] = function(block) {
    // Text value.
    const code = Blockly.C.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['text_join'] = function(block) {
    // Create a string made up of any number of elements of any type.
    let code;
    if (block.itemCount_ == 0) {
      return ['\'\'', Blockly.C.ORDER_ATOMIC];
    } else if (block.itemCount_ == 1) {
      const argument0 = Blockly.C.valueToCode(block, 'ADD0',
          Blockly.C.ORDER_NONE) || '\'\'';
      code = 'String(' + argument0 + ')';
      return [code, Blockly.C.ORDER_FUNCTION_CALL];
    } else if (block.itemCount_ == 2) {
      const argument0 = Blockly.C.valueToCode(block, 'ADD0',
          Blockly.C.ORDER_NONE) || '\'\'';
      const argument1 = Blockly.C.valueToCode(block, 'ADD1',
          Blockly.C.ORDER_NONE) || '\'\'';
      code = 'String(' + argument0 + ') + String(' + argument1 + ')';
      return [code, Blockly.C.ORDER_ADDITION];
    } else {
      code = new Array(block.itemCount_);
      for (let n = 0; n < block.itemCount_; n++) {
        code[n] = Blockly.C.valueToCode(block, 'ADD' + n,
            Blockly.C.ORDER_COMMA) || '\'\'';
      }
      code = '[' + code.join(',') + '].join(\'\')';
      return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
  };

  Blockly.C['text_append'] = function(block) {
    // Append to a variable in place.
    const varName = Blockly.C.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const argument0 = Blockly.C.valueToCode(block, 'TEXT',
        Blockly.C.ORDER_NONE) || '\'\'';
    return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
  };

  Blockly.C['text_length'] = function(block) {
    // String or array length.
    const argument0 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length', Blockly.C.ORDER_MEMBER];
  };

  Blockly.C['text_isEmpty'] = function(block) {
    // Is the string null or array empty?
    const argument0 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_MEMBER) || '\'\'';
    return ['!' + argument0 + '.length', Blockly.C.ORDER_LOGICAL_NOT];
  };

  Blockly.C['text_indexOf'] = function(block) {
    // Search the text for a substring.
    const operator = block.getFieldValue('END') == 'FIRST' ?
        'indexOf' : 'lastIndexOf';
    const argument0 = Blockly.C.valueToCode(block, 'FIND',
        Blockly.C.ORDER_NONE) || '\'\'';
    const argument1 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_MEMBER) || '\'\'';
    const code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
    return [code, Blockly.C.ORDER_ADDITION];
  };

  Blockly.C['text_charAt'] = function(block) {
    // Get letter at index.
    // Note: Until January 2013 this block did not have the WHERE input.
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    let at = Blockly.C.valueToCode(block, 'AT',
        Blockly.C.ORDER_UNARY_NEGATION) || '1';
    const text = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_MEMBER) || '\'\'';
    switch (where) {
      case 'FIRST': {
        const code = text + '.charAt(0)';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
      case 'LAST': {
        const code = text + '.slice(-1)';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
      case 'FROM_START': {
        // Blockly uses one-based indicies.
        if (Blockly.isNumber(at)) {
          // If the index is a naked number, decrement it right now.
          at = parseFloat(at) - 1;
        } else {
          // If the index is dynamic, decrement it in code.
          at += ' - 1';
        }
        const code = text + '.charAt(' + at + ')';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
      case 'FROM_END': {
        const code = text + '.slice(-' + at + ').charAt(0)';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
      case 'RANDOM': {
        const functionName = Blockly.C.provideFunction_(
            'textRandomLetter',
            [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
                '(text) {',
              '  var x = Math.floor(Math.random() * text.length);',
              '  return text[x];',
              '}']);
        const code = functionName + '(' + text + ')';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
    }
    throw 'Unhandled option (text_charAt).';
  };

  Blockly.C['text_getSubstring'] = function(block) {
    // Get substring.
    const text = Blockly.C.valueToCode(block, 'STRING',
        Blockly.C.ORDER_MEMBER) || '\'\'';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');
    const at1 = Blockly.C.valueToCode(block, 'AT1',
        Blockly.C.ORDER_NONE) || '1';
    const at2 = Blockly.C.valueToCode(block, 'AT2',
        Blockly.C.ORDER_NONE) || '1';
    let code = '';
    if (where1 == 'FIRST' && where2 == 'LAST') {
      code = text;
    } else {
      const functionName = Blockly.C.provideFunction_(
          'textGetSubstring',
          [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
              '(text, where1, at1, where2, at2) {',
            '  function getAt(where, at) {',
            '    if (where == \'FROM_START\') {',
            '      at--;',
            '    } else if (where == \'FROM_END\') {',
            '      at = text.length - at;',
            '    } else if (where == \'FIRST\') {',
            '      at = 0;',
            '    } else if (where == \'LAST\') {',
            '      at = text.length - 1;',
            '    } else {',
            '      throw \'Unhandled option (text_getSubstring).\';',
            '    }',
            '    return at;',
            '  }',
            '  at1 = getAt(where1, at1);',
            '  at2 = getAt(where2, at2) + 1;',
            '  return text.slice(at1, at2);',
            '}']);
      code = functionName + '(' + text + ', \'' +
          where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
    }
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['text_changeCase'] = function(block) {
    // Change capitalization.
    const OPERATORS = {
      'UPPERCASE': '.toUpperCase()',
      'LOWERCASE': '.toLowerCase()',
      'TITLECASE': null
    };
    const operator = OPERATORS[block.getFieldValue('CASE')];
    let code;
    if (operator) {
      // Upper and lower case are functions built into C.
      const argument0 = Blockly.C.valueToCode(block, 'TEXT',
          Blockly.C.ORDER_MEMBER) || '\'\'';
      code = argument0 + operator;
    } else {
      // Title case is not a native C function.  Define one.
      const functionName = Blockly.C.provideFunction_(
          'textToTitleCase',
          [ 'function ' +
              Blockly.C.FUNCTION_NAME_PLACEHOLDER_ + '(str) {',
            '  return str.replace(/\\S+/g,',
            '      function(txt) {return txt[0].toUpperCase() + ' +
                'txt.substring(1).toLowerCase();});',
            '}']);
      const argument0 = Blockly.C.valueToCode(block, 'TEXT',
          Blockly.C.ORDER_NONE) || '\'\'';
      code = functionName + '(' + argument0 + ')';
    }
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['text_trim'] = function(block) {
    // Trim spaces.
    const OPERATORS = {
      'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
      'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
      'BOTH': '.trim()'
    };
    const operator = OPERATORS[block.getFieldValue('MODE')];
    const argument0 = Blockly.C.valueToCode(block, 'TEXT',
        Blockly.C.ORDER_MEMBER) || '\'\'';
    return [argument0 + operator, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['text_print'] = function(block) {
      // Print statement.
      const argument0 = Blockly.C.valueToCode(block, 'TEXT',
      Blockly.C.ORDER_NONE) || '\'\'';
      return `Serial.println(${argument0});\n`;
  };

  Blockly.C['text_prompt_ext'] = function(block) {
    // Prompt function.
    let msg;
    if (block.getField('TEXT')) {
      // Internal message.
      msg = Blockly.C.quote_(block.getFieldValue('TEXT'));
    } else {
      // External message.
      msg = Blockly.C.valueToCode(block, 'TEXT',
          Blockly.C.ORDER_NONE) || '\'\'';
    }
    let code = 'window.prompt(' + msg + ')';
    const toNumber = block.getFieldValue('TYPE') == 'NUMBER';
    if (toNumber) {
      code = 'parseFloat(' + code + ')';
    }
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['text_prompt'] = Blockly.C['text_prompt_ext'];
}
