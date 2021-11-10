import { expect } from "chai";
import { describe, before, it } from "mocha";
import {
  SideBarView,
  ViewContent,
  Notification,
  ViewSection,
} from "vscode-extension-tester";
import { avoidsBacksliding, delay, openAdvplProject } from "../helper";
import { ServerTreePageObject } from "../page-objects/server-tree-po";
import { WorkbenchPageObject } from "../page-objects/workbench-po";
import { DELETE_DATA, APPSERVER_DATA } from "../scenario";

describe("TOTVS: Server View", () => {
  let view: SideBarView;
  let serverTreePO: ServerTreePageObject;
  let workbenchPO: WorkbenchPageObject;

  before(async () => {
    await openAdvplProject();

    workbenchPO = new WorkbenchPageObject();
    view = await workbenchPO.openTotvsView();
    serverTreePO = new ServerTreePageObject(view);
  });

  it("No Servers", async () => {
    const content: ViewContent = view.getContent();
    const sections: ViewSection[] = await content.getSections();

    expect(await sections[0].getVisibleItems()).is.empty;
  });

  it("Add Local Server", async () => {
    await serverTreePO.addNewServer(APPSERVER_DATA);
  });

  it("Remove Server", async () => {
    await avoidsBacksliding();
    await serverTreePO.addNewServer(DELETE_DATA);
    await delay(2000);
    await serverTreePO.removeServer(DELETE_DATA.serverName);

    expect(await serverTreePO.getServerTreeItem(DELETE_DATA.serverName)).is
      .undefined;
  });
});
