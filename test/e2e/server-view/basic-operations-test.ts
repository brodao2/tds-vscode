// import the webdriver and the high level browser wrapper
import { expect } from "chai";
import { describe, before, it } from "mocha";
import {
  Workbench,
  TreeItem,
  ViewItemAction,
  InputBox,
  QuickPickItem,
} from "vscode-extension-tester";
import {
  delay,
  openAdvplProject
} from "../helper";
import { ServerTreePageObject } from "../page-objects/server-tree-po";
import { StatusPageObject } from "../page-objects/status-po";
import { ADMIN_USER_DATA } from "../servers-data";

// Create a Mocha suite
describe("TOTVS: Server View Basic Operations", () => {
  let workbench: Workbench;
  let serverTreePO: ServerTreePageObject;
  let serverTreeItem: TreeItem;
  let pickBox: InputBox;
  let title: string = "";
  let statusBarPO: StatusPageObject;

  const LOCALHOST_NAME: string = "localhost";
  const LOCALHOST_ENVIRONMENT: string = "p12";

  before(async () => {
    workbench = new Workbench();

    await openAdvplProject("project2");
    await delay();

    serverTreePO = new ServerTreePageObject();
    serverTreeItem = await serverTreePO.getServerTreeItem(LOCALHOST_NAME);
    statusBarPO = new StatusPageObject();

    await delay();
  });

  after(async () => {

  })

  it("No Server Connected", async () => {
    expect(await statusBarPO.isNoServerSelected()).is.true;
  });

  it("isSelected Node", async () => {
    await serverTreeItem.select();
    await delay(3);

    const klass = await serverTreeItem.getAttribute("class");
    expect(klass.indexOf("selected")).greaterThan(-1);
    //expect(await view.isDisplayed()).to.be.true;
    //expect(await serverTreeItem.isSelected()).to.be.true;
  });

  it("Fire Connect Action", async () => {
    const action: ViewItemAction = await serverTreeItem.getActionButton(
      "Connect"
    );

    await action.click();
    await delay();
  });

  it("Input Environment", async () => {
    pickBox = new InputBox();
    await delay();

    title = await pickBox.getTitle();
    expect(title).is.equal("Connection (1/1)");

    let quickPicks: QuickPickItem[] = await pickBox.getQuickPicks();
    expect(quickPicks).is.not.empty;

    await pickBox.setText(LOCALHOST_ENVIRONMENT);
    await delay();
    await pickBox.confirm();
    await delay();
  });

  it("Input User", async () => {
    await pickBox.wait(3000);
    title = await pickBox.getTitle();
    expect(title).is.equal("Authentication (1/2)");

    await pickBox.setText(ADMIN_USER_DATA.username);
    await delay();
    await pickBox.confirm();
    await delay();

    await pickBox.wait();
    title = await pickBox.getTitle();
    expect(title).is.equal("Authentication (2/2)");

    await pickBox.setText(ADMIN_USER_DATA.password);
    await delay();
    await pickBox.confirm();
    await delay();
  });

  it("Localhost Server Connected", async () => {
    await statusBarPO.waitConnection();
    expect(await statusBarPO.isConnected(LOCALHOST_NAME, LOCALHOST_ENVIRONMENT)).is.true;
  });

  it("Fire Disconnect Action", async () => {
    const action: ViewItemAction = await serverTreeItem.getActionButton(
      "Disconnect"
    );
    await delay();

    await action.click();
    await delay();
  });

  it("Localhost Server Disconnected", async () => {
    expect(await statusBarPO.isNoServerSelected()).is.true;
  });

  it("Try Connect Using Invalid Environment", async () => {
    try {
      await serverTreePO.connect(LOCALHOST_NAME, "p12_invalid", ADMIN_USER_DATA.username, ADMIN_USER_DATA.password);
    } catch (error) {

    }
    await delay();

    expect(await statusBarPO.isNoServerSelected()).is.true;
  });

});
