export class GameDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.gameTitle = page.locator('#appHubAppName');

    this.downloadButton = page.getByRole('link', { name: /download|descargar/i });

    this.needSteamButton = page.getByRole('link', { name: /No.*Steam/i });
  }

  async getTitle() {
    return (await this.gameTitle.innerText()).trim();
  }

  async goToAboutSteam() {
  await this.downloadButton.click();
  await this.needSteamButton.waitFor({ timeout: 10000 });
  await this.needSteamButton.click();

  await this.page.waitForURL(/store\.steampowered\.com\/about/i, {
    timeout: 15000,
  });
}
}
