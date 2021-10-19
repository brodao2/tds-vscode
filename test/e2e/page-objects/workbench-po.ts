import {
  Workbench,
  Notification,
  NotificationType,
  WebElement,
} from "vscode-extension-tester";
import { delay } from "../helper";
import { NotificationPageObject } from "./notification-po";
import { StatusPageObject } from "./status-po";
import { expect } from "chai";

export class WorkbenchPageObject {
  private workbench: Workbench;
  private statusBar: StatusPageObject;
  private notification: NotificationPageObject;

  constructor() {
    this.workbench = new Workbench();
    this.statusBar = new StatusPageObject(this.workbench);
    this.notification = new NotificationPageObject(this.workbench);
  }

  async wait() {
    await delay(500);
    await this.workbench.getStatusBar().wait(2000);
  }

  async isConnected(
    LOCALHOST_NAME: string,
    LOCALHOST_ENVIRONMENT: string
  ): Promise<boolean> {
    return (
      (await this.statusBar.statusBarWithText(
        `${LOCALHOST_NAME} / ${LOCALHOST_ENVIRONMENT}`,
        10000
      )) !== null
    );
  }

  async isNeedSelectServer(): Promise<boolean> {
    return (
      (await this.statusBar.statusBarWithText(/Select server\/environment/)) !==
      null
    );
  }

  async isLoggedIn(): Promise<boolean> {
    return (
      (await this.statusBar.statusBarWithText(/Permissions: Logged in/)) !==
      null
    );
  }

  async isNotLoggedIn(): Promise<boolean> {
    return (
      (await this.statusBar.statusBarWithText(/Permissions: NOT logged in/)) !==
      null
    );
  }

  private async waitProcessFinish(
    targetText: RegExp | string,
    _wait: number = 30000
  ): Promise<Notification> {
    let steps: number = _wait / 500;
    this.statusBar.statusBarWithText;
    let notification: Notification = await this.getNotification(targetText);

    if (notification) {
      while ((await notification.hasProgress()) && steps > 0) {
        await delay(500);

        steps--;
      }

      expect(
        notification.hasProgress(),
        `Timeout process (${_wait}ms): ${targetText}`
      ).is.false;
    }

    return notification;
  }

  async waitConnection(wait: number = 30000): Promise<void> {
    await this.waitProcessFinish(/Authenticating user/);
    // if (
    //   (await this.statusBar.statusBarWithText(/Authenticating user.*/),
    //   wait) === null
    // ) {
    //   throw new Error(`Connection process timeout (${wait})ms`);
    // }
  }

  async waitReconnection(wait: number = 30000): Promise<void> {
    await this.waitProcessFinish(/Reconnecting to the server/);
    // if (
    //   (await this.statusBar.statusBarWithText(/.*Reconnecting to the server*./),
    //   wait) === null
    // ) {
    //   throw new Error(`Connection process timeout (${wait})ms`);
    // }
  }

  async waitCheckIntegrity(wait: number = 30000): Promise<void> {
    await this.waitProcessFinish(/Reconnecting to the server/);
    // if (
    //   (await this.statusBar.statusBarWithText(/Checking RPO integrity/),
    //   wait) === null
    // ) {
    //   throw new Error(`Check Integrity process timeout (${wait})ms`);
    // }
  }

  async waitRevalidate(wait: number = 30000): Promise<void> {
    await this.waitProcessFinish(/Revalidating RPO/);
    // if (
    //   (await this.statusBar.statusBarWithText(/Revalidating RPO/), wait) ===
    //   null
    // ) {
    //   throw new Error(`Revalidate process timeout (${wait})ms`);
    // }
  }

  async getNotification(
    targetText: RegExp | string,
    dimiss: boolean = true,
    _wait: number = 1000
  ): Promise<Notification> {
    const notification: Notification = await this.notification.getNotification(
      targetText,
      dimiss,
      NotificationType.Any,
      _wait
    );

    return notification;
  }

  async executeCommand(command: string) {
    await this.workbench.executeCommand(command);
  }
}
