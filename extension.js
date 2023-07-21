// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "htmlboilerplate" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "htmlboilderplate.createHtmlBoilerPlate",
    function () {
      if (
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders.length > 0
      ) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
          const workspaceDirectory = workspaceFolders[0].uri.fsPath;
          console.log(workspaceDirectory);

          const filePath = workspaceDirectory;

          const htmlfilePathCheck = workspaceDirectory + "/index.html";
          // File path for the index.html file

          const cssfilePathCheck = workspaceDirectory + "/style.css";
          const javascriptfilePathCheck = workspaceDirectory + "/script.js";

          // Check if the file already exists
          if (
            fs.existsSync(htmlfilePathCheck) ||
            fs.existsSync(cssfilePathCheck) ||
            fs.existsSync(javascriptfilePathCheck)
          ) {
            vscode.window
              .showQuickPick(["Yes", "No"], {
                placeHolder:
                  "The file 'index.html' or 'style.css' or 'script.js' already exists. Do you want to overwrite it?",
              })
              .then((selection) => {
                if (selection === "Yes") {
                  createHtmlFile(filePath);
                } else {
                  vscode.window.showInformationMessage("Operation cancelled.");
                }
              });
          } else {
            createHtmlFile(filePath);
          }
        }
      } else {
        vscode.window.showErrorMessage("No workspace folders found.");
      }
    }
  );

  function createHtmlFile(filePath) {
    const htmlFilePath = filePath + "/index.html";
    //Creating HTML File
    // Content for the index.html file
    const htmlContent =
      '<!DOCTYPE html> \
          <html lang="en"> \
          <head> \
              <meta charset="UTF-8"> \
              <meta name="viewport" content="width=device-width, initial-scale=1.0">\
              <title>Document</title> \
              <script type="text/javascript" src="script.js"></script>\
              <link rel="stylesheet" href="styles.css" /> \
          </head> \
          <body> \
          </body> \
          </html>';

    const formattedHTMLContent = prettier.format(htmlContent, {
      parser: "html",
    });

    fs.writeFile(htmlFilePath, formattedHTMLContent, (err) => {
      if (err) {
        console.error(err);
        return vscode.window.showErrorMessage(
          "Failed to create a HTML boilerplate file."
        );
      } else {
        return vscode.window.showInformationMessage(
          "Created a HTML boilerplate file."
        );
      }
    });

    //Creating CSS File
    const CSSContent = "html {background-color: azure;}";

    const cssFilePath = filePath + "/style.css";
    const formattedCSSContent = prettier.format(CSSContent, { parser: "css" });

    fs.writeFile(cssFilePath, formattedCSSContent, (err) => {
      if (err) {
        console.error(err);
        return vscode.window.showErrorMessage(
          "Failed to create a CSS boilerplate file."
        );
      } else {
        return vscode.window.showInformationMessage(
          "Created a CSS boilerplate file."
        );
      }
    });

    //creating Javascript File
    const javascriptContent = "//Javacript comments";

    const jsFilePath = filePath + "/script.js";
    const formattedJavascriptContent = prettier.format(javascriptContent, {
      parser: "babel",
    });

    fs.writeFile(jsFilePath, formattedJavascriptContent, (err) => {
      if (err) {
        console.error(err);
        return vscode.window.showErrorMessage(
          "Failed to create a Javacript boilerplate file."
        );
      } else {
        return vscode.window.showInformationMessage(
          "Created a Javacript boilerplate file."
        );
      }
    });
  }

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
