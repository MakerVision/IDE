import {
    lightBlue600, green600, indigo500, teal500, deepPurple500, orange500
} from 'material-ui/styles/colors';
export default function reconfigureBlocklyColors() {
    // Logic
    setManyBlockColor([
        'controls_if', 'logic_compare', 'logic_operation', 'logic_negate',
        'logic_boolean', 'logic_null', 'logic_ternary'
    ], lightBlue600);

    // Loops
    setManyBlockColor([
        'controls_repeat_ext', 'controls_whileUntil', 'controls_for',
        'controls_forEach', 'controls_flow_statements'
    ], green600);

    // Math
    setManyBlockColor([
        'math_number', 'math_arithmetic', 'math_single', 'math_trig',
        'math_constant', 'math_number_property', 'math_change',
        'math_round', 'math_on_list', 'math_modulo', 'math_constrain',
        'math_random_int', 'math_random_float'
    ], indigo500);

    // Text
    setManyBlockColor([
        'text', 'text_join', 'text_append', 'text_length', 'text_isEmpty',
        'text_indexOf', 'text_charAt', 'text_getSubstring', 'text_changeCase',
        'text_trim', 'text_print', 'text_prompt_ext'
    ], teal500);

    // Lists
    setManyBlockColor([
        'lists_create_with', 'lists_repeat', 'lists_length', 'lists_isEmpty',
        'lists_indexOf', 'lists_getIndex', 'lists_setIndex', 'lists_getSublist',
        'lists_split', 'lists_sort',
    ], deepPurple500);

    // Colors
    setManyBlockColor([
        'colour_picker', 'colour_random', 'colour_rgb', 'colour_blend',
    ], orange500);
}

function setManyBlockColor(names, color) {
    names.forEach((name) => {
        setBlockColor(name, color);
    });
}

function setBlockColor(name, color) {
    const originalInit = Blockly.Blocks[name].init;
    Blockly.Blocks[name].init = function init() {
        originalInit.call(this);
        this.setColour(color);
    };
}
