class SearchPage {

    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://duckduckgo.com/');
    }

    async search(text) {
        await page.locator('input[name=q]').fill(text);
        await page.locator('input[name=q]').press('Enter');
    }
}
module.exports = { SearchPage };

   