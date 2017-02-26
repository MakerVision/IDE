const key = 'MakerVision_AutoSave';

export function save(workspace) {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    window.localStorage.setItem(key, Blockly.Xml.domToText(xml));
}

export function retrieve() {
    if (window.localStorage[key]) {
        const xml = window.localStorage[key];
        return Blockly.Xml.textToDom(xml);
    }
    return null;
}
