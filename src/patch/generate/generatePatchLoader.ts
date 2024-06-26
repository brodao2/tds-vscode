/*
Copyright 2021 TOTVS S.A

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http: //www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as vscode from 'vscode';
import * as path from 'path';
import { GeneratePatchPanelAction, IGeneratePatchPanelAction } from './actions';
import { ServersConfig } from '../../utils';
import {
  IGeneratePatchData,
  IServerFS,
  PatchProcess,
} from './generatePatchData';
import { IGetPatchDirResult, sendGetPatchDir } from '../../protocolMessages';
import { sendPatchGenerateMessage } from '../patchUtil';
import { ServerItem } from '../../serverItem';

const fs = require('fs');
const os = require('os');

const WS_STATE_KEY = 'GENERATE_PATCH_TABLE';

let generatePathLoader: GeneratePatchLoader = undefined;

export function openGeneratePatchView(
  context: vscode.ExtensionContext,
  args: any = {}
) {
  const server = ServersConfig.getCurrentServer();

  if (generatePathLoader === undefined || generatePathLoader === null) {
    generatePathLoader = new GeneratePatchLoader(context, args);
  }

  generatePathLoader.toggleServer(server);
}

class GeneratePatchLoader {
  protected readonly _panel: vscode.WebviewPanel | undefined;
  private _disposables: vscode.Disposable[] = [];
  private _currentServer: any = null;
  private _context: vscode.ExtensionContext;
  private _generatePatchData: IGeneratePatchData;
  private _nodeMap: Map<string, IServerFS> = new Map<string, IServerFS>();

  public get currentServer(): any {
    return this._currentServer;
  }

  public set currentServer(value: any) {
    this._currentServer = value;

    if (value) {
      this._generatePatchData.serverName = value.name;
    } else {
      this._generatePatchData.serverName = '';
      this._generatePatchData.rootFolder = undefined;
    }

    this.updatePage();
  }

  constructor(context: vscode.ExtensionContext, args: any) {
    this._context = context;

    const ext = vscode.extensions.getExtension('TOTVS.tds-vscode');
    this._panel = vscode.window.createWebviewPanel(
      'generatePathLoader',
      vscode.l10n.t('Generate Patch'),
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(ext.extensionPath, 'out', 'webpack')),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent();
    this._panel.onDidChangeViewState(
      (listener: vscode.WebviewPanelOnDidChangeViewStateEvent) => {
        if (this.currentServer !== null) {
          this.updatePage();
        }
      },
      undefined,
      this._disposables
    );

    this._panel.webview.onDidReceiveMessage(
      (command: IGeneratePatchPanelAction) => {
        this.handleMessage(command);
        this.updatePage();
      },
      undefined,
      this._disposables
    );

    this._panel.onDidDispose((event) => {
      //this._isDisposed = true;

      generatePathLoader = undefined;
    });
  }

  public toggleServer(serverItem: ServerItem) {
    this.currentServer = serverItem;
  }

  private updatePage() {
    const hasServer: boolean = this.currentServer ? true : false;
    const hasData: boolean = hasServer; //&& this._generatePatchData.patchFiles.length > 0;
    if (hasServer) {
      if (!this._generatePatchData.rootFolder) {
        const root: IServerFS = {
          id: 'root_' + this.currentServer.id,
          name: this.currentServer.name,
          children: [],
          directory: true,
          path: '',
          parentId: '',
        };

        this.loadServerFS(root).then((result: IServerFS) => {
          this._generatePatchData.rootFolder = result;

          this._nodeMap[result.id] = result;
          result.children.forEach((folder: IServerFS) => {
            this._nodeMap[result.id] = folder;
          }, this);

          this._panel.webview.postMessage({
            command: GeneratePatchPanelAction.UpdatePage,
            data: this._generatePatchData,
          });
        });
      } else {
        this._panel.webview.postMessage({
          command: GeneratePatchPanelAction.UpdatePage,
          data: this._generatePatchData,
        });
      }
    }
  }

  private handleMessage(command: IGeneratePatchPanelAction) {
    const data: IGeneratePatchData = command.content;
    this._generatePatchData = command.content;

    switch (command.action) {
      case GeneratePatchPanelAction.Cancel: {
        this._panel.dispose();
        break;
      }
      case GeneratePatchPanelAction.Generate: {
        this.doGenerate(data.rpoMaster, data.targetFolder, data.targetFile);
        break;
      }
      case GeneratePatchPanelAction.SelectFoler: {
        this.doSelectFolder(data.targetFolder);

        break;
      }
      default:
        console.log('***** ATTENTION: generatePathLoader.tsx');
        console.log('\tUnrecognized command: ' + command.action);
        console.log('\t' + command.content);
        break;
    }
  }

  private initData(memento: any): IGeneratePatchData {
    this._generatePatchData = {
      serverName: '',
      targetFolder: memento['targetFolder'],
      targetFile: '',
      rpoMaster: '',
      rootFolder: undefined,
    };

    return this._generatePatchData;
  }

  private /*async*/ loadServerFS(target: IServerFS) {
    const server = this.currentServer;
    const that = this;

    const createChild = function (
      parent: IServerFS,
      resource: string,
      directory: boolean
    ): IServerFS {
      return {
        id: (directory ? 'folder_' : 'file_') + Date.now().toString(36) + '_' + parent.children.length,
        name: resource,
        children: [],
        directory: directory,
        path: (parent.path.length === 0 ? '' : parent.path + '\\') + resource,
        parentId: parent.id,
      };
    };

    const getPatchDir = async function (folder: IServerFS) {
      let folders: IGetPatchDirResult = undefined;
      await sendGetPatchDir(server, folder.path, true).then(
        (result: IGetPatchDirResult) => (folders = result)
      );

      let files: IGetPatchDirResult = undefined;
      await sendGetPatchDir(server, folder.path, false).then(
        (result: IGetPatchDirResult) => (files = result)
      );

      folders.directory.forEach((resource: string) => {
        const child = createChild(folder, resource, true);
        folder.children.push(child);
      });

      files.directory.forEach((resource: string) => {
        if (resource.toLowerCase().endsWith('.rpo')) {
          folder.children.push(createChild(folder, resource, false));
        }
      });

      return folder;
    };

    return new Promise(async (resolve, _) => {
      const result = await getPatchDir(target);

      if (result.children.length > Number.MAX_SAFE_INTEGER) {
        result.children.forEach((resource: IServerFS) => {
          if (resource.directory) {
            this.loadServerFS(resource);
            resolve(result);
          }
        });
      }

      resolve(result);
    });
  }

  private doGenerate(rpoMaster: string, targetFolder: string, targetFile: string) {
    const total: number = 4;
    let cnt: number = 0;
    let inc: number = 100 / total;
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: vscode.l10n.t('Generating Patch'),
        cancellable: true,
      },
      async (progress, token) => {
        token.onCancellationRequested(() => {
          vscode.window.showInformationMessage('User canceled the operation');
        });
        progress.report({ increment: 0, message: 'Inicializando...' });

        sendPatchGenerateMessage(this.currentServer, rpoMaster,
          targetFolder, 3, targetFile, []).then((result) => {
            progress.report({ increment: 100, message: 'Finalizado' });
            this._panel.dispose();
          });
      }
    );
  }

  private doSelectFolder(folder: string) {
    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: 'Select',
      canSelectFiles: false,
      canSelectFolders: true,
      defaultUri: vscode.Uri.parse(folder),
    };

    vscode.window.showOpenDialog(options).then((folder) => {
      if (folder && folder[0]) {
        this._generatePatchData.targetFolder = folder[0].fsPath;
        this.updatePage();
      }
    });
  }

  private getWebviewContent(): string {
    // Local path to main script run in the webview
    const ext = vscode.extensions.getExtension('TOTVS.tds-vscode');
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(ext.extensionPath, 'out', 'webpack', 'GeneratePatchPanel.js')
    );

    const servers: ServerItem[] = this.currentServer
      ? [this.currentServer]
      : [];

    const reactAppUri: vscode.Uri = this._panel?.webview.asWebviewUri(
      reactAppPathOnDisk
    );
    const memento: any = this._context.workspaceState.get(WS_STATE_KEY, {
      process: PatchProcess.fromRpo,
      ignoreTres: true,
      targetFolder: '',
    });
    const configJson: any = {
      serverList: servers,
      memento: memento,
      translations: getTranslations(),
      generatePathData: this.initData(memento),
    };

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monitor View</title>

        <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none';
                             img-src https:;
                             script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                             style-src vscode-resource: 'unsafe-inline';">

        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.initialData = ${JSON.stringify(configJson)};
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script crossorigin src="${reactAppUri}"></script>
    </body>
    </html>`;
  }
}

function getTranslations() {
  return {
    GENERATE_PATCH: vscode.l10n.t('Generate Patch'),
    //   NO_DATA: localize(
    //     "NO_DATA",
    //     "There are no patchs to validate or apply."
    //   ),
    //   FILES: vscode.l10n.t( "files"),
    //   FILTER: vscode.l10n.t( "Filter"),
    //   FILTERING_ON_OFF: vscode.l10n.t( "Filtering on/off"),
    //   FIRST: vscode.l10n.t( "First"),
    //   FIRST_PAGE: vscode.l10n.t( "First page"),
    //   FROM_TO_OF_COUNT: vscode.l10n.t( "from-to de count"),
    //   LAST: vscode.l10n.t( "Last"),
    //   LAST_PAGE: vscode.l10n.t( "Last page"),
    //   LINES_PAGE: vscode.l10n.t( "lines/p."),
    //   NEXT: vscode.l10n.t( "Next"),
    //   NEXT_PAGE: vscode.l10n.t( "Next page"),
    //   PREVIOUS: vscode.l10n.t( "Previous"),
    //   PREVIOUS_PAGE: vscode.l10n.t( "Previous page"),
    //   SEARCH: vscode.l10n.t( "Search"),
    //   SEARCH_ALL_COLUMNS: vscode.l10n.t( "Search in all columns"),
    //   FILES_SELECTED: localize(
    //     "FILES_SELECTED",
    //     "{0} files selected"
    //   ),
    //   STATUS: vscode.l10n.t( "Status"),
    //   NAME: vscode.l10n.t( "Name"),
    //   FULLPATH: vscode.l10n.t( "Full File Name"),
    //   SIZE: vscode.l10n.t( "Size(KB)"),
    //   ACTIONS: vscode.l10n.t( "Actions"),
    //   REMOVE_PATCH: vscode.l10n.t( "Remove patch"),
    //   VALIDATE_PATCH: vscode.l10n.t( "Validate patch"),
    //   //
    //   ENVIRONMENT: vscode.l10n.t( "Environment"),
    //   RESOURCE: vscode.l10n.t( "Resource"),
    //   RPO: vscode.l10n.t( "RPO"),
    //   PACK: vscode.l10n.t( "Patch"),
    //   DLG_TITLE_RESOURCES: vscode.l10n.t( "Resources"),
    //   ENVIRONEMNT: vscode.l10n.t( "Environemnt"),
    //   SHOW_COLUMNS: vscode.l10n.t( "Show Columns"),
    //
  };
}

