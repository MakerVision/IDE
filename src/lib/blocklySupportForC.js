/* eslint-disable no-underscore-dangle, prefer-template, guard-for-in */
/* eslint-disable  dot-notation, no-restricted-syntax */
import colour from './c/colour';
import lists from './c/lists';
import logic from './c/logic';
import loops from './c/loops';
import math from './c/math';
import procedures from './c/procedures';
import text from './c/text';
import variables from './c/variables';

export default function blocklySupportForC() {
    Blockly.FieldNumberRange = function (initial, min, max) {
        return new Blockly.FieldNumber(
            initial.toString(),
            (v) => {
                if (v > max) {
                    return max.toString();
                } else if (v < min) {
                    return min.toString();
                }
                return v.toString();
            }
        );
    };
    Blockly.C = new Blockly.Generator('C');
    Blockly.C.addReservedWords('auto,else,long,switch,break,enum,register,typedef,' +
    'case,extern,return,union,char,float,short,unsigned,' +
    'const,for,signed,void,continue,goto,sizeof,volatile,' +
    'default,if,static,while,do,int,struct,_Packed,double');
    /**
    * Order of operation ENUMs.
    * https://developer.mozilla.org/en/C/Reference/Operators/Operator_Precedence
    */
    Blockly.C.ORDER_ATOMIC = 0;         // 0 '' ...
    Blockly.C.ORDER_MEMBER = 1;         // . []
    Blockly.C.ORDER_NEW = 1;            // new
    Blockly.C.ORDER_FUNCTION_CALL = 2;  // ()
    Blockly.C.ORDER_INCREMENT = 3;      // ++
    Blockly.C.ORDER_DECREMENT = 3;      // --
    Blockly.C.ORDER_LOGICAL_NOT = 4;    // !
    Blockly.C.ORDER_BITWISE_NOT = 4;    // ~
    Blockly.C.ORDER_UNARY_PLUS = 4;     // +
    Blockly.C.ORDER_UNARY_NEGATION = 4; // -
    Blockly.C.ORDER_TYPEOF = 4;         // typeof
    Blockly.C.ORDER_VOID = 4;           // void
    Blockly.C.ORDER_DELETE = 4;         // delete
    Blockly.C.ORDER_MULTIPLICATION = 5; // *
    Blockly.C.ORDER_DIVISION = 5;       // /
    Blockly.C.ORDER_MODULUS = 5;        // %
    Blockly.C.ORDER_ADDITION = 6;       // +
    Blockly.C.ORDER_SUBTRACTION = 6;    // -
    Blockly.C.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
    Blockly.C.ORDER_RELATIONAL = 8;     // < <= > >=
    Blockly.C.ORDER_IN = 8;             // in
    Blockly.C.ORDER_INSTANCEOF = 8;     // instanceof
    Blockly.C.ORDER_EQUALITY = 9;       // == != === !==
    Blockly.C.ORDER_BITWISE_AND = 10;   // &
    Blockly.C.ORDER_BITWISE_XOR = 11;   // ^
    Blockly.C.ORDER_BITWISE_OR = 12;    // |
    Blockly.C.ORDER_LOGICAL_AND = 13;   // &&
    Blockly.C.ORDER_LOGICAL_OR = 14;    // ||
    Blockly.C.ORDER_CONDITIONAL = 15;   // ?:
    Blockly.C.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
    Blockly.C.ORDER_COMMA = 17;         // ,
    Blockly.C.ORDER_NONE = 99;          // (...)

    /**
    * Allow for switching between one and zero based indexing, one based by
    * default.
    */
    Blockly.C.ONE_BASED_INDEXING = true;
    /**
    * Initialise the database of variable names.
    * @param {!Blockly.Workspace} workspace Workspace to generate code from.
    */
    Blockly.C.init = function init(workspace) {
        // Create a dictionary of definitions to be printed before the code.
        Blockly.C.definitions_ = Object.create(null);  // eslint-disable-line
        // Create a dictionary mapping desired function names in definitions_
        // to actual function names (to avoid collisions with user functions).
        Blockly.C.functionNames_ = Object.create(null);

        if (!Blockly.C.variableDB_) {
            Blockly.C.variableDB_ = new Blockly.Names(Blockly.C.RESERVED_WORDS_);
        } else {
            Blockly.C.variableDB_.reset();
        }
        const defvars = [];
        const vars = Blockly.C.allVariables(workspace);  // need to implement
        for (let i = 0; i < vars.length; i++) {
            const item = vars[i];
            if (item.value !== undefined) {
                defvars.push(`${item.type} ${item.name} = ${item.value};`);
            } else {
                defvars.push(`${item.type} ${item.name};`);
            }
        }

        const defIncludes = Blockly.C.allIncludes(workspace);
        Blockly.C.definitions_['variables'] = defIncludes.join('\n') + '\n\n' + defvars.join('\n');
    };

    Blockly.C.allVariables = function allVariables(root) {
        // must return all {name, type} variables
        let blocks;
        if (root.getDescendants) {
            // Root is Block.
            blocks = root.getDescendants();
        } else if (root.getAllBlocks) {
            // Root is Workspace.
            blocks = root.getAllBlocks();
        } else {
            throw new Error('Not Block or Workspace: ' + root);
        }
        const all = [];
        blocks.forEach((b) => {
            if (b.variables) {
                b.variables.forEach((v) => {
                    all.push(v);
                });
            }
        });
        return all;
    };


    Blockly.C.setupLines = {};
    Blockly.C.provideSetup_ = function (key, linesOfCode) {
        Blockly.C.setupLines[key] = linesOfCode;
    };
    Blockly.C.allSetup = function () {
        const keys = Object.keys(Blockly.C.setupLines);
        return keys.reduce((agg, key) => agg.concat(Blockly.C.setupLines[key]), []);
    };

    Blockly.C.allIncludes = function allIncludes(root) {
        // must return all {name, type} includes
        let blocks;
        if (root.getDescendants) {
            // Root is Block.
            blocks = root.getDescendants();
        } else if (root.getAllBlocks) {
            // Root is Workspace.
            blocks = root.getAllBlocks();
        } else {
            throw new Error('Not Block or Workspace: ' + root);
        }
        const all = [];
        blocks.forEach((b) => {
            if (b.includes) {
                b.includes.forEach((v) => {
                    if (all.indexOf(v) === -1) {
                        all.push(v);
                    }
                });
            }
        });
        return all;
    };

    /**
    * Prepend the generated code with the variable definitions.
    * @param {string} code Generated code.
    * @return {string} Completed code.
    */
    Blockly.C.finish = function finish(code) {
        // Convert the definitions dictionary into a list.
        const definitions = [];
        for (const name in Blockly.C.definitions_) {
            definitions.push(Blockly.C.definitions_[name]);
        }
        // Clean up temporary data.
        delete Blockly.C.definitions_;
        delete Blockly.C.functionNames_;
        Blockly.C.variableDB_.reset();
        return definitions.join('\n') + '\n\n' + code;
    };

    /**
    * Naked values are top-level blocks with outputs that aren't plugged into
    * anything.  A trailing semicolon is needed to make this legal.
    * @param {string} line Line of generated code.
    * @return {string} Legal line of code.
    */
    Blockly.C.scrubNakedValue = function scrubNakedValue(line) {
        return line + ';\n';
    };

    /**
    * Encode a string as a properly escaped C string, complete with
    * quotes.
    * @param {string} string Text to encode.
    * @return {string} C string.
    * @private
    */
    Blockly.C.quote_ = function quote_(string) {
        // Can't use goog.string.quote since Google's style guide recommends
        // JS string literals use single quotes.
        const s = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
        return '\'' + s + '\'';
    };

    /**
    * Common tasks for generating C from blocks.
    * Handles comments for the specified block and any connected value blocks.
    * Calls any statements following this block.
    * @param {!Blockly.Block} block The current block.
    * @param {string} code The C code created for this block.
    * @return {string} C code with comments and subsequent blocks added.
    * @private
    */
    Blockly.C.scrub_ = function scrub_(block, code) {
        let commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            let comment = block.getCommentText();
            comment = Blockly.utils.wrap(comment, this.COMMENT_WRAP - 3);
            if (comment) {
                if (block.getProcedureDef) {
                    // Use a comment block for function comments.
                    commentCode += '/**\n' +
                    Blockly.C.prefixLines(comment + '\n', ' * ') +
                    ' */\n';
                } else {
                    commentCode += Blockly.C.prefixLines(comment + '\n', '// ');
                }
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (let i = 0; i < block.inputList.length; i++) {
                if (block.inputList[i].type === Blockly.INPUT_VALUE) {
                    const childBlock = block.inputList[i].connection.targetBlock();
                    if (childBlock) {
                        const c = Blockly.C.allNestedComments(childBlock);
                        if (c) {
                            commentCode += Blockly.C.prefixLines(c, '// ');
                        }
                    }
                }
            }
        }
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        const nextCode = Blockly.C.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    };
    colour();
    lists();
    logic();
    loops();
    math();
    procedures();
    text();
    variables();
}
