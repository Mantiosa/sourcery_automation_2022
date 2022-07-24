const { expect } = require("@playwright/test");

class SearchResultsPage {

    constructor(page) {
        this.page = page;
    }

    async check(text1, text2) {
        let text = await this.page.locator(text1).getAttribute('href');
        await expect(text).toContain(text2);
    }
}
module.exports = { SearchResultsPage };