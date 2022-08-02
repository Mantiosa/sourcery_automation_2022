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

const calculatorPageUrl = 'https://testsheepnz.github.io/BasicCalculator';

const buildSelector = '#selectBuild';
const numberField1Selector = '#number1Field';
const numberField2Selector = '#number2Field';
const operationDropdownSelector = '#selectOperationDropdown';
const calculateButtonSelector = '#calculateButton'; 
const numberAnswerField = '#numberAnswerField';
const clearButtonSelector = '#clearButton'
const integerOnlySelector = '#integerSelect'
//const errorMessageField = '#errorMsgField';

async function selectBuildVersion(page, version) {
  await page.selectOption( buildSelector, { label: version});
}

async function fillNumberFields(page, number1, number2) {
  await page.locator(numberField1Selector).type(number1);
  await page.locator(numberField2Selector).type(number2);
}

async function selectOperation(page, calculationOperation) {
  await page.selectOption(operationDropdownSelector, {label: calculationOperation});
}

async function calculateAnswer(page, calculateButtonSelector) {
  await page.locator(calculateButtonSelector).click();
}

async function expectedValue(page, value) {
  await expect(page.locator(numberAnswerField)).toHaveValue(value);
}

async function clearFields(page, clearButtonSelector) {
  await page.locator(clearButtonSelector).click();
}

async function clearButtonEnabled(page, clearButtonSelector) {
  await expect(page.locator(clearButtonSelector)).toBeEnabled();
} 

async function setIntegerOnly(page, integerOnlySelector) {
  await page.locator(integerOnlySelector).click();
}

async function integerOnlyEnabled(page, integerOnlySelector) {
  await expect(page.locator(integerOnlySelector)).toBeEnabled();
}

async function integerOnlyDisabled(page, integerOnlySelector) {
  await expect(page.locator(integerOnlySelector)).toBeDisabled();
} 

async function calculateButtonEnabled(page, calculateButtonSelector) {
  await expect(page.locator(calculateButtonSelector)).toBeEnabled();
} 

async function numberField1Enabled(page, numberField1Selector) {
  await expect(page.locator(numberField1Selector)).toBeEnabled();
} 

async function numberField2Enabled(page, numberField2Selector) {
  await expect(page.locator(numberField2Selector)).toBeEnabled();
} 


// async function expectedErrorMessage(page, message) {
//   await expect(page.locator('errorMessageField')).toHaveText(message);
// }


data.forEach(version => {
  test.describe(version + ': Add', () => {
    test('Adding two positive integers results in a correct sum', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '2', '3');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expectedValue(page, '5');
    });

    test('Multiplying a postive integer and a negative integer results in a sum', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '2.5', '-3');
      await selectOperation(page, 'Multiply');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expectedValue(page, '-7.5');
    });

    test('Multiplying by zero results in a zero', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '10', '0');
      await selectOperation(page, 'Multiply');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expectedValue(page, '0');
    });

    test('Adding maximum field lenght numbers results in a correct sum', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '9999999999', '9999999999');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);

      await expectedValue(page, '19999999998');
    });

    test('Concatenating two values results in a correct string', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '2', '3');
      await selectOperation(page, 'Concatenate');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expectedValue(page, '23');
    });

    test('Dividing an integer by zero displays an error', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '2', '0');
      await selectOperation(page, 'Divide');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expect(page.locator('#errorMsgField')).toHaveText('Divide by zero error!');
      //await expectedErrorMessage(page, ('Divide by zero error!'));
      //Tried different ways, cannot currently solve this problem of receiving "" value.(Function and selector variable are commented out)
    });

    test('Clear button is enabled', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await clearButtonEnabled(page, clearButtonSelector);
    });

    test('Clear button clears the answer field', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '1', '2');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);
      await clearFields(page, clearButtonSelector);
  
      await expectedValue(page, '');
    });

    test('Integer only option is enabled for Add operation', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await selectOperation(page, 'Add');
      await integerOnlyEnabled(page, integerOnlySelector);
    });

    test('Integer only option is enabled for Subtract operation', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await selectOperation(page, 'Subtract');
      await integerOnlyEnabled(page, integerOnlySelector);
    });

    test('Integer only option is enabled for Multiply operation', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await selectOperation(page, 'Multiply');
      await integerOnlyEnabled(page, integerOnlySelector);
    });

    test('Integer only option is enabled for Divide operation', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await selectOperation(page, 'Divide');
      await integerOnlyEnabled(page, integerOnlySelector);
    });

    test('Integer only option is disabled for Concatenate operation', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await selectOperation(page, 'Concatenate');
      await integerOnlyDisabled(page, integerOnlySelector);
    });

    test('Integer only option changes answer to integer', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '1.1', '1.2');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);
      await expectedValue(page, '2.3');

      await setIntegerOnly(page, integerOnlySelector);
      await expectedValue(page, '2');

    });

    test('Adding string and integer displays an error', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, 'a', '2');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expect(page.locator('#errorMsgField')).toHaveText('Number 1 is not a number');
      //await expectedErrorMessage(page, ('Number 1 is not a number'));
    });

    test('Adding integer and string displays an error', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '2', 'a');
      await selectOperation(page, 'Add');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expect(page.locator('#errorMsgField')).toHaveText('Number 2 is not a number');
       //await expectedErrorMessage(page, ('Number 2 is not a number'));
    });

    test('Concatenating string and integer results in a correct string', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, 'a', '2');
      await selectOperation(page, 'Concatenate');
      await calculateAnswer(page, calculateButtonSelector);
  
      await expectedValue(page, 'a2');
    });
    test('Subtracting two positive integers results in a correct sum', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await fillNumberFields(page, '5', '10');
      await selectOperation(page, 'Subtract');
      await calculateAnswer(page, calculateButtonSelector);

      await expectedValue(page, '-5');
    });

    test('Calculate button is enabled', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await calculateButtonEnabled(page, calculateButtonSelector);
    });

    test('First number field is enabled', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await numberField1Enabled(page, numberField1Selector);
    });

    test('Second number field is enabled', async ({ page }) => {
      await page.goto(calculatorPageUrl);
      await selectBuildVersion(page, version);
      await numberField2Enabled(page, numberField2Selector);
    });
  });
});
