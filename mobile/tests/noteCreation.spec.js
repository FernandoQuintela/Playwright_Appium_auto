import { remote } from 'webdriverio';
import { expect } from 'chai';
import { androidCaps } from '../config/android.caps.js';

describe('Joplin - Note Creation', function () {
  this.timeout(120000);

  /** @type {import('webdriverio').Browser} */
  let driver;

  before(async () => {
    driver = await remote({
      protocol: 'http',
      hostname: '127.0.0.1',
      port: 4723,
      path: '/',
      capabilities: androidCaps
    });
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('should create a note titled "Mobile automation"', async () => {
    const allNotesTitle = await driver.$(
      'android=new UiSelector().textContains("All notes")'
    );
    await allNotesTitle.waitForDisplayed({ timeout: 10000 });

    const plusButton = await driver.$(
      'android=new UiSelector().descriptionContains("New")'
    );
    await plusButton.waitForDisplayed({ timeout: 10000 });
    await plusButton.click();

    const newNoteButton = await driver.$(
      'android=new UiSelector().textContains("New note")'
    );
    await newNoteButton.waitForDisplayed({ timeout: 10000 });
    await newNoteButton.click();

    const titleField = await driver.$(
      'android=new UiSelector().className("android.widget.EditText").instance(0)'
    );
    await titleField.waitForDisplayed({ timeout: 10000 });

    await titleField.clearValue();
    await titleField.setValue('Mobile automation');

    const enteredTitle = await titleField.getText();
    expect(enteredTitle).to.equal('Mobile automation');

    try {
      await driver.hideKeyboard();
    } catch (e) {
    }

    if (typeof driver.isKeyboardShown === 'function') {
      const isShown = await driver.isKeyboardShown();
      expect(isShown).to.be.false;
    }
  });
});
