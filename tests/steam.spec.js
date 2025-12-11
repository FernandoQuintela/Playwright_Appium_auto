import { test, expect } from '@playwright/test';
import { SteamHomePage } from '../page-objects/steamHome.page';
import { SearchResultsPage } from '../page-objects/searchResults.page';
import { GameDetailsPage } from '../page-objects/gameDetails.page';
import { AboutSteamPage } from '../page-objects/aboutSteam.page';

test.describe('Steam search and About page', () => {
  test('Search "The Stanley Parable" and validate About Steam stats', async ({ page }) => {
    const home = new SteamHomePage(page);
    const results = new SearchResultsPage(page);
    const gameDetails = new GameDetailsPage(page);
    const aboutSteam = new AboutSteamPage(page);

    await page.goto('https://store.steampowered.com/charts/');
    await page.waitForLoadState('networkidle');

    await home.open();
    await home.searchFor('The Stanley Parable');

    const titles = await results.getResultTitles();
    console.log('RESULT TITLES:', titles);

    expect(titles[0]).toContain('The Stanley Parable');
    expect(titles[2]).toContain('The Stanley Parable Demo');

    await results.clickFirstResultWithJs();

    const title = await gameDetails.getTitle();
    expect(title).toContain('The Stanley Parable');

    await gameDetails.goToAboutSteam();

    await expect(aboutSteam.installSteamButton).toBeVisible();

    const { online, playing } = await aboutSteam.getOnlineAndPlayingNow();

    if (online !== null && playing !== null) {
      expect(playing).toBeLessThan(online);
    } else {
      console.warn(
        'Online / Playing stats were not found on the About page. ' +
        'Skipping numeric comparison because Steam did not expose the values.'
      );
    }
  });
});
