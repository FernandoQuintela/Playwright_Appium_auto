export class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.resultRows = page.locator('.search_result_row');
  }

  async getResultTitles() {
    await this.resultRows.first().waitFor({ timeout: 15000 });

    const count = await this.resultRows.count();
    const titles = [];

    for (let i = 0; i < count; i++) {
      const title = await this.resultRows.nth(i).locator('.title').innerText();
      titles.push(title.trim());
    }

    return titles;
  }

  async clickFirstResultWithJs() {
    const firstRow = this.resultRows.first();
    const elementHandle = await firstRow.elementHandle();
    await this.page.evaluate(el => el.click(), elementHandle);
  }

  getResultRowByIndex(index) {
    return this.resultRows.nth(index);
  }
}
