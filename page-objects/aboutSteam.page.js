export class AboutSteamPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.installSteamButton = page
      .getByRole('link', { name: /install steam/i })
      .first();
  }

  async isInstallSteamVisible() {
    return this.installSteamButton.isVisible();
  }

  async getOnlineAndPlayingNow() {
    await this.page.waitForLoadState('networkidle');

    const { online, playing } = await this.page.evaluate(() => {
      const nums = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      while (walker.nextNode()) {
        const text = (walker.currentNode.textContent || '').trim();
        if (!text) continue;

        const matches = text.match(/\d[\d.,]+/g);
        if (!matches) continue;

        for (const part of matches) {
          const numeric = parseInt(part.replace(/[^\d]/g, ''), 10);
          if (!Number.isNaN(numeric)) {
            nums.push(numeric);
            if (nums.length === 2) break;
          }
        }

        if (nums.length === 2) break;
      }

      if (nums.length < 2) {
        return { online: null, playing: null };
      }

      return { online: nums[0], playing: nums[1] };
    });

    return { online, playing };
  }
}
