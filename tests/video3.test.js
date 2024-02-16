const { test, expect } = require('@playwright/test');
const { clickOnSearchField } = require('../fixture/youtube.fixture'); 

/*
    This test has a fixture that starts all tests from the search bar within the youtube platform.
    Then the searchQuery is typed in and searched for.
    Then a validation is made to make sure that the title of the first video contains the expectedTitle.
    Then the first video is clicked into to view as it is the correct expected video result.
*/
test('Video 3 Test', async ({ page }) => {
  // Use the fixture
  await clickOnSearchField(page);

  // Verify that the search input field is focused
  const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
  expect(isSearchInputFocused).toBeTruthy();

  // Variables for strings
  const searchQuery = 'I restored this 2$ ebay Junk Game Boy Color';
  const expectedTitle = 'I Restored This 2$ Ebay Junk Game Boy Color';

  // Type search query
  await page.fill('input#search', searchQuery);

  // Click on search button
  await page.click('button#search-icon-legacy');

  // Wait for the search results to load
  await page.waitForSelector('ytd-video-renderer');

  // Get text content of the first search result
  const firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);

  // Assert that the first search result contains "I restored this 2$ ebay Junk Game Boy Color"
  expect(firstSearchResult).toContain(expectedTitle);

  // Click on the first video in the search results
  await page.click('ytd-video-renderer');

});

/*
    This test is designed to fail related to the test above
    this test fails purposefully because of the toLowerCase() function
    when playwright is retreiving the title of the video.
    To debug this,
    I approach debugging playwright test scripts as follows:
    1. Looking at the HTML report that shows in the localhost after pulling code from Github
        a. Playwright actually has a very good stack trace that is shown in the html report, which is very helpful and makes debugging easier
        b. running the test in a local environment, also shows the error trace in terminal where it is also not too difficult to comb through and find the method or lines that is causing issues.
    In order for this to be fixed, there are two potential resolves,
    1. To call the toLowerCase() function to expectedTitle or
    2. remove the toLowerCase() function call from firstSearchResult Line 70
*/
test('Video 3 Test Fail', async ({ page }) => {
    // Use the fixture
    await clickOnSearchField(page);
  
    // Verify that the search input field is focused
    const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
    expect(isSearchInputFocused).toBeTruthy();

    // Variables for strings
    const searchQuery = 'I restored this 2$ ebay Junk Game Boy Color';
    const expectedTitle = 'I Restored This 2$ Ebay Junk Game Boy Color';
  
    // Type search query
    await page.fill('input#search', searchQuery);
  
    // Click on search button
    await page.click('button#search-icon-legacy');
  
    // Wait for the search results to load
    await page.waitForSelector('ytd-video-renderer');
  
    // Get text content of the first search result
    const firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);
  
    // Assert that the first search result contains "I restored this 2$ ebay Junk Game Boy Color"
    expect(firstSearchResult.toLowerCase()).toContain(expectedTitle);
  
    // Click on the first video in the search results
    await page.click('ytd-video-renderer');
  
  });