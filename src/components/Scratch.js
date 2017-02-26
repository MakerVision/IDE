import React, { PropTypes } from 'react';
import addBlocklySupportForC from '../lib/blocklySupportForC';
import reconfigureBlocklyColors from '../lib/reconfigureBlocklyColors';
import SetupBlock from './blocks/SetupBlock';
import MainLoopBlock from './blocks/MainLoopBlock';
import styles from './Scratch.css';
import ga from '../ga';
import { save, retrieve } from '../utils/blocklySaver';

class Scratch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { unformattedCode: '' };
    }
    componentWillMount() {
        addBlocklySupportForC();
        reconfigureBlocklyColors();
    }
    componentDidMount() {
        const blocklyDiv = document.getElementById('blocklyDiv');
        const workspace = Blockly.inject(blocklyDiv,
            {
                toolbox: document.getElementById('toolbox'),
                trashcan: true,
            });

        const defaultBlocks = document.getElementById('startBlocks');
        const autosavedBlocks = retrieve();
        const blocks = autosavedBlocks != null ? autosavedBlocks : defaultBlocks;
        try {
            Blockly.Xml.domToWorkspace(blocks, workspace);
        } catch (e) {
            alert('Sorry, there was an error loading your last session...'); // eslint-disable-line
            Blockly.xml.domToWorkspace(defaultBlocks, workspace);
        }

        workspace.addChangeListener((event) => {
            save(workspace);
            if (event.type === Blockly.Events.CREATE) {
                const blockType = event.xml.getAttribute('type');
                ga('send', 'event', 'Block', 'Created', blockType);
            }
            const code = Blockly.C.workspaceToCode(workspace);
            if (code !== this.state.unformattedCode) {
                this.state.unformattedCode = code;
                const htmlifiedCode =
                    Prism.highlight(code, Prism.languages.cpp)
                    .replace(/\n/g, '<br>')
                    .replace(/\s\s/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                this.props.codeUpdated(htmlifiedCode, this.state.unformattedCode);
            }
        });
        this.workspace = workspace;
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 1);
    }
    componentWillUnmount() {
        this.workspace.dispose();
    }
    render() {
        return (
            <div className="fill-parent pure-g">
                <div className="pure-u-3-5 fill-vertical-hack">
                    <div style={{ display: 'none' }}>
                        <div>
                            <SetupBlock />
                            <MainLoopBlock />
                        </div>
                        <xml id="toolbox">
                            {this.props.children}
                        </xml>
                        <xml id="startBlocks">
                            <block type="setup" deletable="false" movable="false" x="100" y="100">
                                <next>
                                    <block type="main_loop" deletable="false" movable="false">
                                    </block>
                                </next>
                            </block>
                        </xml>
                    </div>
                    <div id="workspace"></div>
                    <div id="blocklyArea"></div>
                    <div id="blocklyDiv" className="fill-parent"></div>
                </div>
                <div
                    className={
                        `pure-u-2-5 ${styles.codeView} fill-vertical-hack scroll-y`
                    }
                >
                    <div style={{ padding: '5px 0 50px 5px' }}>
                        <span
                            id="code"
                            className={styles.code}
                            dangerouslySetInnerHTML={{ __html: this.props.scratch.code }}
                        >
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

Scratch.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    scratch: PropTypes.object.isRequired,
    codeUpdated: PropTypes.func.isRequired,
    notifySuccess: PropTypes.func.isRequired,
};

export default Scratch;
