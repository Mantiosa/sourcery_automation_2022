const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/SearchPage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');

test.describe('search', () => {
    test('First test should contain devbridge.com', async ({ page }) => {
        let searchPage = new SearchPage(page);
        await searchPage.navigate();
        await searchPage.search('devbridge');
        
        // await page.goto('https://duckduckgo.com/');
        // await page.locator('input[name=q]').fill('devbridge');
        // await page.locator('input[name=q]').press('Enter');


        let text = await page.locator('#r1-0 h2 a').getAttribute('href');

        expect(text).toContain('devbridge.com');

    });
    test('The fourth result should contain linkedin.com', async ({ page }) => {
        let searchPage = new SearchPage(page);
        await searchPage.navigate();
        await searchPage.search('devbridge');
        let searchResultsPage = new SearchResultsPage(page);
        await searchResultsPage.check('#r1-3 h2 a', 'linkedin');

        // await page.goto('https://duckduckgo.com/');
        // await page.locator('input[name=q]').fill('devbridge');
        // await page.locator('input[name=q]').press('Enter');

        let text = await page.locator('#r1-3 h2 a').getAttribute('href');

        //expect(text).toContain('linkedin.com');
    });

});