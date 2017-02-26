/* eslint-disable */
export default function lists() {
  'use strict';

  Blockly.C['lists_create_empty'] = function(/* block */) {
    // Create an empty list.
    return ['[]', Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['lists_create_with'] = function(block) {
    // Create a list with any number of elements of any type.
    let code = new Array(block.itemCount_);
    for (let n = 0; n < block.itemCount_; n++) {
      code[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_COMMA) || 'null';
    }
    code = '[' + code.join(', ') + ']';
    return [code, Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['lists_repeat'] = function(block) {
    // Create a list with one element repeated.
    const functionName = Blockly.C.provideFunction_(
        'listsRepeat',
        [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
            '(value, n) {',
          '  var array = [];',
          '  for (var i = 0; i < n; i++) {',
          '    array[i] = value;',
          '  }',
          '  return array;',
          '}']);
    const argument0 = Blockly.C.valueToCode(block, 'ITEM',
        Blockly.C.ORDER_COMMA) || 'null';
    const argument1 = Blockly.C.valueToCode(block, 'NUM',
        Blockly.C.ORDER_COMMA) || '0';
    const code = functionName + '(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['lists_length'] = function(block) {
    // String or array length.
    const argument0 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_FUNCTION_CALL) || '[]';
    return [argument0 + '.length', Blockly.C.ORDER_MEMBER];
  };

  Blockly.C['lists_isEmpty'] = function(block) {
    // Is the string null or array empty?
    const argument0 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_MEMBER) || '[]';
    return ['!' + argument0 + '.length', Blockly.C.ORDER_LOGICAL_NOT];
  };

  Blockly.C['lists_indexOf'] = function(block) {
    // Find an item in the list.
    const operator = block.getFieldValue('END') == 'FIRST' ?
        'indexOf' : 'lastIndexOf';
    const argument0 = Blockly.C.valueToCode(block, 'FIND',
        Blockly.C.ORDER_NONE) || '\'\'';
    const argument1 = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_MEMBER) || '[]';
    const code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
    return [code, Blockly.C.ORDER_ADDITION];
  };

  Blockly.C['lists_getIndex'] = function(block) {
    // Get element at index.
    // Note: Until January 2013 this block did not have MODE or WHERE inputs.
    const mode = block.getFieldValue('MODE') || 'GET';
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    let at = Blockly.C.valueToCode(block, 'AT',
        Blockly.C.ORDER_UNARY_NEGATION) || '1';
    // Special case to avoid wrapping function calls in unneeded parenthesis.
    // func()[0] is prefered over (func())[0]
    const valueBlock = this.getInputTargetBlock('VALUE');
    const order = (valueBlock && valueBlock.type == 'procedures_callreturn') ?
        Blockly.C.ORDER_NONE : Blockly.C.ORDER_MEMBER;
    const list = Blockly.C.valueToCode(block, 'VALUE', order) || '[]';

    if (where == 'FIRST') {
      if (mode == 'GET') {
        const code = list + '[0]';
        return [code, Blockly.C.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        const code = list + '.shift()';
        return [code, Blockly.C.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.shift();\n';
      }
    } else if (where == 'LAST') {
      if (mode == 'GET') {
        const code = list + '.slice(-1)[0]';
        return [code, Blockly.C.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        const code = list + '.pop()';
        return [code, Blockly.C.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.pop();\n';
      }
    } else if (where == 'FROM_START') {
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      if (mode == 'GET') {
        const code = list + '[' + at + ']';
        return [code, Blockly.C.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        const code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);\n';
      }
    } else if (where == 'FROM_END') {
      if (mode == 'GET') {
        const code = list + '.slice(-' + at + ')[0]';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      } else if (mode == 'GET_REMOVE' || mode == 'REMOVE') {
        const functionName = Blockly.C.provideFunction_(
            'listsRemoveFromEnd',
            [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
                '(list, x) {',
              '  x = list.length - x;',
              '  return list.splice(x, 1)[0];',
              '}']);
        const code = functionName + '(' + list + ', ' + at + ')';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.C.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + ';\n';
        }
      }
    } else if (where == 'RANDOM') {
      const functionName = Blockly.C.provideFunction_(
          'listsGetRandomItem',
          [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
              '(list, remove) {',
            '  var x = Math.floor(Math.random() * list.length);',
            '  if (remove) {',
            '    return list.splice(x, 1)[0];',
            '  } else {',
            '    return list[x];',
            '  }',
            '}']);
      const code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
      if (mode == 'GET' || mode == 'GET_REMOVE') {
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + ';\n';
      }
    }
    throw 'Unhandled combination (lists_getIndex).';
  };

  Blockly.C['lists_setIndex'] = function(block) {
    // Set element at index.
    // Note: Until February 2013 this block did not have MODE or WHERE inputs.
    let list = Blockly.C.valueToCode(block, 'LIST',
        Blockly.C.ORDER_MEMBER) || '[]';
    const mode = block.getFieldValue('MODE') || 'GET';
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    let at = Blockly.C.valueToCode(block, 'AT',
        Blockly.C.ORDER_NONE) || '1';
    const value = Blockly.C.valueToCode(block, 'TO',
        Blockly.C.ORDER_ASSIGNMENT) || 'null';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    // Closure, which accesses and modifies 'list'.
    function cacheList() {
      if (list.match(/^\w+$/)) {
        return '';
      }
      const listVar = Blockly.C.variableDB_.getDistinctName(
          'tmp_list', Blockly.Variables.NAME_TYPE);
      const code = 'var ' + listVar + ' = ' + list + ';\n';
      list = listVar;
      return code;
    }
    if (where == 'FIRST') {
      if (mode == 'SET') {
        return list + '[0] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.unshift(' + value + ');\n';
      }
    } else if (where == 'LAST') {
      if (mode == 'SET') {
        let code = cacheList();
        code += list + '[' + list + '.length - 1] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        return list + '.push(' + value + ');\n';
      }
    } else if (where == 'FROM_START') {
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      if (mode == 'SET') {
        return list + '[' + at + '] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.splice(' + at + ', 0, ' + value + ');\n';
      }
    } else if (where == 'FROM_END') {
      let code = cacheList();
      if (mode == 'SET') {
        code += list + '[' + list + '.length - ' + at + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + list + '.length - ' + at + ', 0, ' + value +
            ');\n';
        return code;
      }
    } else if (where == 'RANDOM') {
      let code = cacheList();
      const xVar = Blockly.C.variableDB_.getDistinctName(
          'tmp_x', Blockly.Variables.NAME_TYPE);
      code += 'var ' + xVar + ' = Math.floor(Math.random() * ' + list +
          '.length);\n';
      if (mode == 'SET') {
        code += list + '[' + xVar + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + xVar + ', 0, ' + value + ');\n';
        return code;
      }
    }
    throw 'Unhandled combination (lists_setIndex).';
  };

  Blockly.C['lists_getSublist'] = function(block) {
    // Get sublist.
    const list = Blockly.C.valueToCode(block, 'LIST',
        Blockly.C.ORDER_MEMBER) || '[]';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');
    const at1 = Blockly.C.valueToCode(block, 'AT1',
        Blockly.C.ORDER_NONE) || '1';
    const at2 = Blockly.C.valueToCode(block, 'AT2',
        Blockly.C.ORDER_NONE) || '1';
    let code = '';
    if (where1 == 'FIRST' && where2 == 'LAST') {
      code = list + '.concat()';
    } else {
      const functionName = Blockly.C.provideFunction_(
          'listsGetSublist',
          [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
              '(list, where1, at1, where2, at2) {',
            '  function getAt(where, at) {',
            '    if (where == \'FROM_START\') {',
            '      at--;',
            '    } else if (where == \'FROM_END\') {',
            '      at = list.length - at;',
            '    } else if (where == \'FIRST\') {',
            '      at = 0;',
            '    } else if (where == \'LAST\') {',
            '      at = list.length - 1;',
            '    } else {',
            '      throw \'Unhandled option (lists_getSublist).\';',
            '    }',
            '    return at;',
            '  }',
            '  at1 = getAt(where1, at1);',
            '  at2 = getAt(where2, at2) + 1;',
            '  return list.slice(at1, at2);',
            '}']);
      code = functionName + '(' + list + ', \'' +
          where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
    }
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['lists_sort'] = function(block) {
    // Block for sorting a list.
    const listCode = Blockly.C.valueToCode(
        block, 'LIST',
        Blockly.C.ORDER_FUNCTION_CALL) || '[]';
    const direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
    const type = block.getFieldValue('TYPE');
    const getCompareFunctionName = Blockly.C.provideFunction_(
            'listsGetSortCompare',
    ['function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
      '(type, direction) {',
        '  var compareFuncs = {',
        '    "NUMERIC": function(a, b) {',
        '        return parseFloat(a) - parseFloat(b); },',
        '    "TEXT": function(a, b) {',
        '        return a.toString() > b.toString() ? 1 : -1; },',
        '    "IGNORE_CASE": function(a, b) {',
        '        return a.toString().toLowerCase() > ' +
        'b.toString().toLowerCase() ? 1 : -1; },',
        '  };',
        '  var compare = compareFuncs[type];',
        '  return function(a, b) { return compare(a, b) * direction; }',
        '}']);
    return ['(' + listCode + ').slice().sort(' +
        getCompareFunctionName + '("' + type + '", ' + direction + '))',
        Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['lists_split'] = function(block) {
    // Block for splitting text into a list, or joining a list into text.
    let value_input = Blockly.C.valueToCode(block, 'INPUT',
        Blockly.C.ORDER_MEMBER);
    const value_delim = Blockly.C.valueToCode(block, 'DELIM',
        Blockly.C.ORDER_NONE) || '\'\'';
    const mode = block.getFieldValue('MODE');
    let functionName = '';
    if (mode == 'SPLIT') {
      if (!value_input) {
        value_input = '\'\'';
      }
      functionName = 'split';
    } else if (mode == 'JOIN') {
      if (!value_input) {
        value_input = '[]';
      }
      functionName = 'join';
    } else {
      throw 'Unknown mode: ' + mode;
    }
    const code = value_input + '.' + functionName + '(' + value_delim + ')';
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };
}
