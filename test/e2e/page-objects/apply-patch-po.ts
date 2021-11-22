import { delay } from "../helper";
import { AbstractPageObject } from "./abstract-po";

export class ApplyPatchPageObject extends AbstractPageObject {
  async setUploadFile(patchList: string[]) {
    await this.beginWebView();

    for await (const patchFile of patchList) {
      await this.setValue("btn-File", patchFile);
      await delay(2000);
    }

    await this.endWebView();
  }

  async fireSubmitClose() {
    await this.beginWebView();

    await this.click("submitCloseID");

    await this.endWebView();
  }
}