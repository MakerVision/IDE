import copy from 'copy-to-clipboard';
import { CODE_UPDATED, CODE_COPIED, WORKSPACE_RESET } from '../actions/scratch';

const defaultState = {
    code: '',
    unformattedCode: ''
};
export default function scratch(state = defaultState, action) {
    const defaultBlocks = document.getElementById('startBlocks');
    const workspace = Blockly.getMainWorkspace();
    switch (action.type) {
    case CODE_UPDATED:
        return Object.assign({}, state, {
            code: action.code,
            unformattedCode: action.unformattedCode
        });
    case CODE_COPIED:
        copy(state.unformattedCode);
        return state;
    case WORKSPACE_RESET:
        workspace.clear();
        Blockly.Xml.domToWorkspace(defaultBlocks, workspace);
        return state;
    default:
        return state;
    }
}
