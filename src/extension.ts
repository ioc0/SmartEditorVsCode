'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
console.log('Congratulations, your extension "test" is now active!');
let editor = vscode.window.activeTextEditor;
const smallNumberDecorationType = vscode.window.createTextEditorDecorationType({
		borderWidth: '1px',
		borderStyle: 'solid',
		overviewRulerColor: 'blue',
		overviewRulerLane: vscode.OverviewRulerLane.Right,
		light: {
			// this color will be used in light color themes
			borderColor: 'darkblue'
		},
		dark: {
			// this color will be used in dark color themes
			borderColor: 'lightblue'
		}
	});    
    const sampleDecorationType = vscode.window.createTextEditorDecorationType({
		cursor: 'crosshair',
		backgroundColor: 'rgba(255,155,0,0.3)'
	});
    const sampleDecoration: vscode.DecorationOptions[] = [];
    let activeEditor = vscode.window.activeTextEditor;
    function updateDecorations(startP,endP){
        if(!activeEditor){
            return;
        }
        let startPos = activeEditor.document.positionAt(startP);
        let endPos = activeEditor.document.positionAt(endP);
        let decoration = {range: new vscode.Range(startPos, endPos), 
		 		hoverMessage: 'This Part is intersting' + '**'}

        sampleDecoration.push(decoration);
        activeEditor.setDecorations(sampleDecorationType,sampleDecoration);

        
    }
    let disposable = vscode.commands.registerCommand('extension.someCommand', () => {
            var server = require('net');
                 
            
            server.createServer(function(socket){
                socket.write('Welcome \n');
                socket.on('data', function (chunk) {
                    var readable = chunk.toString();
                    if (readable == 1){
                        updateDecorations(7,13);
                        updateDecorations(31,37);
                        updateDecorations(55,61);
                        socket.write('decoration updated');

                    }
                    if (readable == 2){
                         updateDecorations(35,50);
                        socket.write('decoration updated');
                    }
                    if (readable == 3){
                        let someText =  editor.document.getText();
                        console.log(someText);
                        socket.write(someText);
                        console.log('Text Sended');
                    }
                    console.log(readable);
                    });
               
            let disposable2 = vscode.commands.registerCommand('extension.playerCommand',() =>{
        
            vscode.window.showInformationMessage('Client Started');
    } );
            
        }).listen(5000);
            console.log('server started port 5000')
                    
          console.log('Server Started');  
    });
    //trying to make multicursor
    let multiCursorButton = vscode.commands.registerCommand('extension.mCursorCommand',()=>{
        var o = {};
        //o.test = 'test';
        //var cursor = vscode.window.showQuickPick()
    });
    // let sendText = vscode.commands.registerCommand('extension.sendTextCommand',() =>{
    //             let editor = vscode.window.activeTextEditor;
    //             let someText =  editor.document.getText();
    //             console.log(someText);
    //             //socket.write('someText');
    //             vscode.window.showInformationMessage('Text Sended');
    //         });
    
    
       
    

    context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {
}