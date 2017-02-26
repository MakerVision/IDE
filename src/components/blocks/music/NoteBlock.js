import React from 'react';
import fieldDropdownPitches from './fieldDropdownPitches';

class NoteBlock extends React.Component {
    componentWillMount() {
        const props = this.props;
        Blockly.Blocks[props.type] = {
            init: function init() {
                const block = this;
                block.appendDummyInput()
                    .appendField(props.label)
                    .appendField(new Blockly.FieldDropdown(fieldDropdownPitches), 'PITCH');
                block.setPreviousStatement(true, null);
                block.setNextStatement(true, null);
                block.setColour(props.color);
                block.setTooltip(props.tooltip);
                block.setHelpUrl(props.helpUrl);
            }
        };
        Blockly.C[this.props.type] = function generator(block) {
            const padding = props.padding;
            const duration = props.duration;
            const pitch = block.getFieldValue('PITCH');
            const code = `delay(${padding}); play(${pitch}, ${duration}); delay(${padding});\n`;
            return code;
        };
    }
    render() {
        return (
            <block type={this.props.type}></block>
        );
    }
}

NoteBlock.propTypes = {
    type: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    helpUrl: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    duration: React.PropTypes.number.isRequired,
    padding: React.PropTypes.number.isRequired,
};

export default NoteBlock;
