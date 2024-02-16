const { test, expect } = require('@playwright/test');
const { clickOnSearchField } = require('../fixture/youtube.fixture'); // Replace './yourFixtureFile' with the correct path to your fixture file

// Define the test
test('My YouTube Test', async ({ page }) => {
  // Use the fixture
  await clickOnSearchField(page);

  // Verify that the search input field is focused
  const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
  expect(isSearchInputFocused).toBeTruthy();

  // Type the search query in the search input field
  await page.fill('input#search', 'I restored this 2$ ebay Junk Game Boy Color');

  // Click on the search button
  await page.click('button#search-icon-legacy');

  // Wait for the search results to load
  await page.waitForSelector('ytd-video-renderer');

  // Click on the first video in the search results
  await page.click('ytd-video-renderer');

  await page.waitForTimeout(3000);
});
