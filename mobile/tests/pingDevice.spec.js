import { remote } from 'webdriverio';
import { expect } from 'chai';
import { androidCaps } from '../config/android.caps.js';

describe('Device ping', function () {
  this.timeout(60000);

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

  it('should get device time', async () => {
    const time = await driver.getDeviceTime();
    console.log('DEVICE TIME:', time);
    expect(time).to.be.a('string');
  });
});
