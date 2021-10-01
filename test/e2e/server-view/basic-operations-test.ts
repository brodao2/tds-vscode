// import the webdriver and the high level browser wrapper
import { expect } from "chai";
import { describe, before, it } from "mocha";
import {
  Notification,
  WebView
} from "vscode-extension-tester";
import {
  delay,
  fillEnvironment,
  fillUserdata,
  openAdvplProject,
  waitNotification
} from "../helper";
import { ServerPageObject } from "../page-objects/server-po";
import { ServerTreeItemPageObject } from "../page-objects/server-tree-item-po";
import { ServerTreePageObject } from "../page-objects/server-tree-po";
import { StatusPageObject } from "../page-objects/status-po";
import { ADMIN_USER_DATA, DELETE_DATA, LOCALHOST_DATA } from "../servers-data";

// Create a Mocha suite
describe.only("TOTVS: Server View Basic Operations", () => {
  let serverTreePO: ServerTreePageObject;
  let serverItemPO: ServerTreeItemPageObject;
  let statusBarPO: StatusPageObject;

  before(async () => {
    await openAdvplProject();

    serverTreePO = new ServerTreePageObject();
    serverTreePO.openView();
    await delay();

    await serverTreePO.addNewServer(LOCALHOST_DATA);

    serverItemPO = new ServerTreeItemPageObject(await serverTreePO.getServerTreeItem(LOCALHOST_DATA.serverName));
    statusBarPO = new StatusPageObject();

    await delay(2000);
  });

  it("No Server Connected", async () => {
    expect(await statusBarPO.isNeedSelectServer()).is.true;
  });

  it("isSelected Node", async () => {
    await serverItemPO.select();

    expect(await serverItemPO.isSelected()).to.be.true;
  });

  it("Fire Connect Action", async () => {
    await serverItemPO.fireConnectAction();
  });

  it("Input Environment", async () => {
    await fillEnvironment(LOCALHOST_DATA.environment);
  });

  it("Input User", async () => {
    await fillUserdata(ADMIN_USER_DATA);
  });

  it("Localhost Server Connected", async () => {
    await statusBarPO.waitConnection();

    expect(await statusBarPO.isConnected(LOCALHOST_DATA.serverName, LOCALHOST_DATA.environment)).is.true;
    expect(await serverItemPO.isConnected()).is.true;
  });

  it("Localhost Server Disconnected", async () => {
    await serverItemPO.select();
    await serverItemPO.fireDisconnectAction();

    expect(await statusBarPO.isNeedSelectServer()).is.true;
    expect(await serverItemPO.isNotConnected()).is.true;
  });

  it.skip("Try Connect Using Invalid Environment", async () => {
    await serverTreePO.disconnectAllServers();

    expect(await serverTreePO.connect(LOCALHOST_DATA.serverName, "p12_invalid", ADMIN_USER_DATA))
      .to.not.throw();

    await delay();
    expect(await statusBarPO.isNeedSelectServer()).is.true;
  });

  it("Reconnect", async () => {
    await serverTreePO.disconnectAllServers();

    await serverItemPO.fireReconnectAction();
    await statusBarPO.isConnected(LOCALHOST_DATA.serverName, LOCALHOST_DATA.environment);

    expect(serverItemPO.isConnected()).is.true;
  });

  it("Add server (context menu)", async () => {
    await serverItemPO.fireAddServerAction();

    const webView: WebView = new WebView();
    await webView.switchToFrame();

    const serverPO = new ServerPageObject();
    await serverPO.fillAddServerPage(webView, DELETE_DATA, true);

    await webView.switchBack();
    await delay();

    const notification: Notification = await waitNotification("Saved server");
    expect(notification).not.is.undefined;

    await serverTreePO.removeServer(DELETE_DATA.serverName);

  });

});
