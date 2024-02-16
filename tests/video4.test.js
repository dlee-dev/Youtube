const { test, expect } = require('@playwright/test');
const { clickOnSearchField } = require('../fixture/youtube.fixture'); 

/*
    This test has a fixture that starts all tests from the search bar within the youtube platform.
    Then the searchQuery is typed in and searched for.
    Then a validation is made to make sure that the title of the first video contains the expectedTitle.
    Then the first video is clicked into to view as it is the correct expected video result.
*/
test('Video 4 Test', async ({ page }) => {
  // Use the fixture
  await clickOnSearchField(page);

  // Verify that the search input field is focused
  const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
  expect(isSearchInputFocused).toBeTruthy();

  // Variables for strings
  const searchQuery = 'puppy';
  const expectedTitle = 'This puppy is too dramatic';

  // Type search query
  await page.fill('input#search', searchQuery);

  // Click on search button
  await page.click('button#search-icon-legacy');

  await page.locator('#chip-bar').getByText('Shorts').click();
    
  // Get text content of the first search result
  const firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);

  // Assert that the first search result contains "I restored this 2$ ebay Junk Game Boy Color"
  expect(firstSearchResult).toContain(expectedTitle);

  // Click on the first video in the search results
  await page.click('ytd-video-renderer');

  await page.waitForTimeout(1000);

});
