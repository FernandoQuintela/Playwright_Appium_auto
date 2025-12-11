export class AllNotesScreen {
  /**
   * @param {import('webdriverio').Browser} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  get addButton() {
    return this.driver.$('//android.widget.ImageButton[@content-desc="+"]');
  }

  get newNoteButton() {
    return this.driver.$('android=new UiSelector().text("New note")');
  }

  async waitForLoaded() {
    await this.addButton.waitForDisplayed({ timeout: 15000 });
  }

  async tapAddNote() {
    await this.addButton.click();
  }

  async tapNewNote() {
    await this.newNoteButton.waitForDisplayed({ timeout: 10000 });
    await this.newNoteButton.click();
  }
}
