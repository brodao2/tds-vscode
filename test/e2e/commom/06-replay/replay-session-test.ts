import { expect } from "chai";
import { describe, before, it } from "mocha";
import { delay, openProject } from "../../helper";
import { ReplayPageObject } from "../../page-objects/replay-po";
import { WorkbenchPageObject } from "../../page-objects/workbench-po";
import { REPLAY_FILES } from "../../scenario";
import path = require("path");
import { DebugToolbar } from "vscode-extension-tester";
import { DebugPageObject } from "../../page-objects/debug-view-po";

const LONG_IMPORT_TIMEOUT = 3 * 60 * 1000; // 3min

describe("Record Replay Session", () => {
  let workbenchPO: WorkbenchPageObject;
  let debugView: DebugPageObject;
  let debugBar: DebugToolbar;

  before(async () => {
    await openProject();

    workbenchPO = new WorkbenchPageObject();
    workbenchPO.openTotvsView();

    debugView = await workbenchPO.openDebugView();

    await delay();
  });

  afterEach(async () => {
    workbenchPO.closeAllEditors();
  });

  it("Prepare source");

  it("Run session");

  it("Replay session");
});
