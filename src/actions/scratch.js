import ga from '../ga';

// Action Types
export const CODE_UPDATED = 'CODE_UPDATED';
export const CODE_COPIED = 'CODE_COPIED';
export const WORKSPACE_RESET = 'WORKSPACE_RESET';

// Action Creators
export function codeUpdated(code, unformattedCode) {
    return {
        type: CODE_UPDATED,
        code,
        unformattedCode
    };
}

export function copyCode() {
    ga('send', 'event', 'Code', 'Copied');
    return {
        type: CODE_COPIED,
    };
}

export function workspaceReset() {
    ga('send', 'event', 'Workspace', 'Reset');
    return {
        type: WORKSPACE_RESET,
    };
}
