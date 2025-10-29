import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {

  console.log("hello there templ-generate-on-save");

  const disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (doc.fileName.endsWith('.templ')) {
      const cmd = `templ generate -f "${doc.fileName}"`;
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          vscode.window.showErrorMessage(`templ error: ${stderr}`);
        } else {
          console.log(stdout);
        }
      });
    }
  });


  context.subscriptions.push(disposable);
}

export function deactivate() {}
