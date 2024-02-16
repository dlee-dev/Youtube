const { test, expect } = require('@playwright/test');
const { clickOnSearchField } = require('../fixture/youtube.fixture'); // Replace './yourFixtureFile' with the correct path to your fixture file

// Define the test
test('My YouTube Test', async ({ page }) => {
  // Use the fixture
  await clickOnSearchField(page);

  // Verify that the search input field is focused
  const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
  expect(isSearchInputFocused).toBeTruthy();
});
