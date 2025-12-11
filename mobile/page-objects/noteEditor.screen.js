export class NoteEditorScreen {
  /**
   * @param {import('webdriverio').Browser} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  get titleField() {
    return this.driver.$('android=new UiSelector().resourceId("com.example.notes:id/title")');
  }

  async waitForLoaded() {
    await this.titleField.waitForDisplayed({ timeout: 15000 });
  }

  async typeTitle(text) {
    await this.titleField.click();
    await this.titleField.setValue(text);
  }

  async getTitleValue() {
    return this.titleField.getText();
  }

  async isKeyboardVisible() {
    return this.driver.isKeyboardShown();
  }

  async hideKeyboard() {
    try {
      await this.driver.hideKeyboard();
    } catch (e) {
    }
  }
}
