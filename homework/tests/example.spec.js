// @ts-check
const { test, expect } = require('@playwright/test');

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]


data.forEach(version => {
  test.describe(version + ': Add', () => {
    test('Adding 2 and 3 results in 5', async ({ page }) => { //
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('3');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('5');
    });

    test('Multiplying 2.5 and -3 results in -7', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2.5');
      await page.locator('#number2Field').type('-3');
      await page.selectOption('#selectOperationDropdown', {label: 'Multiply'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('-7.5');
    });

    test('Multiplying 10 and 0 results in 0', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('10');
      await page.locator('#number2Field').type('0');
      await page.selectOption('#selectOperationDropdown', {label: 'Multiply'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('0');
    });

    test('Adding 9999999999 and 9999999999 results in 19999999998', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('9999999999');
      await page.locator('#number2Field').type('9999999999');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('19999999998');
    });

    test('Concatenating 2 and 3 results in 23', async ({ page }) => { //
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('3');
      await page.selectOption('#selectOperationDropdown', {label: 'Concatenate'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('23');
    });

    test('Dividing 2 and 0 results in an error', async ({ page }) => { //
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('0');
      await page.selectOption('#selectOperationDropdown', {label: 'Divide'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#errorMsgField')).toHaveText('Divide by zero error!');
    });

    test('Clear button is enabled', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#clearButton').click();
    });

    test('Clear button clears the answer', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('1');
      await page.locator('#number2Field').type('2');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
      await page.locator('#clearButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('');
    });

    test('Integer only option is enabled', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#integerSelect').click();
    });

    test('Integer only option is changes answer to integer', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('1.1');
      await page.locator('#number2Field').type('1.2');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
      await expect(page.locator('#numberAnswerField')).toHaveValue('2.3');

      await page.locator('#integerSelect').click();
      await expect(page.locator('#numberAnswerField')).toHaveValue('2');

    });

    test('Adding [a] and 2 displays an error', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('a');
      await page.locator('#number2Field').type('2');
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#errorMsgField')).toHaveText('Number 1 is not a number');
    });

    test('Adding 2 and [a] displays an error', async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('2');
      await page.locator('#number2Field').type('a');
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#errorMsgField')).toHaveText('Number 2 is not a number');
    });

    test('Concatenating [a] and 2 results in a2', async ({ page }) => { //
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type('a');
      await page.locator('#number2Field').type('2');
      await page.selectOption('#selectOperationDropdown', {label: 'Concatenate'});
      await page.locator('#calculateButton').click();
  
      await expect(page.locator('#numberAnswerField')).toHaveValue('a2');
    });
  });
});
