/* eslint-disable */
export default function colour() {
    Blockly.C['colour_picker'] = function(block) {
        // Colour picker.
        const code = '\'' + block.getFieldValue('COLOUR') + '\'';
        return [code, Blockly.C.ORDER_ATOMIC];
    };
    Blockly.C['colour_random'] = function(/* block */) {
        // Generate a random colour.
        const functionName = Blockly.C.provideFunction_(
            'colourRandom',
            [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ + '() {',
            '  const num = Math.floor(Math.random() * Math.pow(2, 24));',
            '  return \'#\' + (\'00000\' + num.toString(16)).substr(-6);',
            '}']);
            const code = functionName + '()';
            return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };
        Blockly.C['colour_rgb'] = function(block) {
            // Compose a colour from RGB components expressed as percentages.
            const red = Blockly.C.valueToCode(block, 'RED',
            Blockly.C.ORDER_COMMA) || 0;
            const green = Blockly.C.valueToCode(block, 'GREEN',
            Blockly.C.ORDER_COMMA) || 0;
            const blue = Blockly.C.valueToCode(block, 'BLUE',
            Blockly.C.ORDER_COMMA) || 0;
            const functionName = Blockly.C.provideFunction_(
                'colourRgb',
                [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
                '(r, g, b) {',
                '  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;',
                '  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;',
                '  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;',
                '  r = (\'0\' + (Math.round(r) || 0).toString(16)).slice(-2);',
                '  g = (\'0\' + (Math.round(g) || 0).toString(16)).slice(-2);',
                '  b = (\'0\' + (Math.round(b) || 0).toString(16)).slice(-2);',
                '  return \'#\' + r + g + b;',
                '}']);
                const code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
                return [code, Blockly.C.ORDER_FUNCTION_CALL];
            };

            Blockly.C['colour_blend'] = function(block) {
                // Blend two colours together.
                const c1 = Blockly.C.valueToCode(block, 'COLOUR1',
                Blockly.C.ORDER_COMMA) || '\'#000000\'';
                const c2 = Blockly.C.valueToCode(block, 'COLOUR2',
                Blockly.C.ORDER_COMMA) || '\'#000000\'';
                const ratio = Blockly.C.valueToCode(block, 'RATIO',
                Blockly.C.ORDER_COMMA) || 0.5;
                const functionName = Blockly.C.provideFunction_(
                    'colourBlend',
                    [ 'function ' + Blockly.C.FUNCTION_NAME_PLACEHOLDER_ +
                    '(c1, c2, ratio) {',
                    '  ratio = Math.max(Math.min(Number(ratio), 1), 0);',
                    '  const r1 = parseInt(c1.substring(1, 3), 16);',
                    '  const g1 = parseInt(c1.substring(3, 5), 16);',
                    '  const b1 = parseInt(c1.substring(5, 7), 16);',
                    '  const r2 = parseInt(c2.substring(1, 3), 16);',
                    '  const g2 = parseInt(c2.substring(3, 5), 16);',
                    '  const b2 = parseInt(c2.substring(5, 7), 16);',
                    '  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);',
                    '  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);',
                    '  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);',
                    '  r = (\'0\' + (r || 0).toString(16)).slice(-2);',
                    '  g = (\'0\' + (g || 0).toString(16)).slice(-2);',
                    '  b = (\'0\' + (b || 0).toString(16)).slice(-2);',
                    '  return \'#\' + r + g + b;',
                    '}']);
                    const code = functionName + '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
                    return [code, Blockly.C.ORDER_FUNCTION_CALL];
                };
            }
