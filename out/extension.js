"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.consoleLogSelected", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
            vscode.window.showWarningMessage("No text selected");
            return;
        }
        const line = editor.document.lineAt(selection.end.line);
        const insertPosition = line.range.end;
        editor.edit((editBuilder) => {
            editBuilder.insert(insertPosition, `\nconsole.log(❌, ${selectedText})`);
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
