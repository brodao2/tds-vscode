import * as vscode from "vscode";
import Utils from "../utils";

const currentSettings: {} = {};
let needRestart: boolean = false;

function isNewSettings(scope: string, key: string, value: any): boolean {
  let result: boolean = true;

  if (currentSettings[scope]) {
    if (currentSettings[scope][key]) {
      result = currentSettings[scope][key] !== value;
    }
  } else {
    currentSettings[scope] = {}
  }

  currentSettings[scope][key] = value;

  return result;
}

export function getLanguageServerSettings(): any[] {
  return getModifiedLanguageServerSettings();
}

export function getModifiedLanguageServerSettings(): any[] {
  let config = vscode.workspace.getConfiguration("totvsLanguageServer");
  needRestart = false;

  const settings: any[] = [];

  if (isNewSettings("advpls", "fsencoding", config.get("filesystem.encoding"))) {
    settings.push({
      scope: "advpls",
      key: "fsencoding",
      value: config.get("filesystem.encoding"),
    });
  }

  if (isNewSettings("advpls", "notificationlevel", config.get("editor.show.notification"))) {
    settings.push({
      scope: "advpls",
      key: "notificationlevel",
      value: config.get("editor.show.notification")
    });
    needRestart = true;
  }

  const usageInfo: string = Utils.isUsageInfoConfig() ? "enabled" : "disabled";
  if (isNewSettings("server", "usageInfo", usageInfo)) {
    settings.push({
      scope: "server",
      key: "usageInfo",
      value: usageInfo
    });
  }

  let linter = config.get("editor.linter.behavior");
  if (String(linter) == "true") { //compatibilização com versões anteriores 1.3.18
    linter = "enabled";
  } else if (String(linter) == "false") {
    linter = "disable";
  }

  if (isNewSettings("linter", "behavior", linter)) {
    settings.push({
      scope: "linter",
      key: "behavior",
      value: linter
    });
  }

  const includes: string = (Utils.getIncludes(true, Utils.getCurrentServer()) || []).join(";");
  if (isNewSettings("linter", "includes", includes)) {
    settings.push({
      scope: "linter",
      key: "includes",
      value: includes
    });
  }

  const hover: string = config.get("editor.hover");
  if (isNewSettings("editor", "hoverMode", hover)) {
    settings.push({
      scope: "editor",
      key: "hoverMode",
      value: hover
    });
  }

  const indexCache: string = config.get("editor.index.cache");
  if (isNewSettings("editor", "index.cache", indexCache)) {
    settings.push({
      scope: "editor",
      key: "indexCache",
      value: indexCache
    });
    needRestart = true;
  }

  // const codeLens: string = config.get("editor.codeLens");
  // if (isNewSettings("editor", "codeLens", codeLens)) {
  //   settings.push({
  //     scope: "editor",
  //     key: "codeLens",
  //     value: codeLens
  //   });
  // }

  // const signatureHelp: string = config.get("editor.signatureHelp");
  // if (isNewSettings("editor", "signatureHelp", signatureHelp)) {
  //   settings.push({
  //     scope: "editor",
  //     key: "signatureHelp",
  //     value: signatureHelp
  //   });
  // }

  return settings;
}

export function confirmRestartNow() {
  if (needRestart) {
    vscode.window.showInformationMessage("To make the change effective, it is necessary to restart VS-CODE.", "Now", "Later").then((value: string) => {
      if (value == "Now") {
        vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    })
  }
}

