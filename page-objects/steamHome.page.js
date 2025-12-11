export class SteamHomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://store.steampowered.com/', { waitUntil: 'networkidle' });

    const acceptButtons = this.page.locator('button:has-text("Accept"), button:has-text("Aceptar")');
    try {
      if (await acceptButtons.first().isVisible({ timeout: 3000 })) {
        await acceptButtons.first().click();
      }
    } catch (e) {
    }
  }

  async searchFor(query) {
    const searchInput = this.page.locator('input[name="term"]');
    await searchInput.waitFor({ timeout: 15000 });
    await searchInput.fill(query);
    await searchInput.press('Enter');
  }
}
