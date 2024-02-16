const { test, expect } = require('@playwright/test');
const { clickOnSearchField } = require('../fixture/youtube.fixture'); 

/*
    This test has a fixture that starts all tests from the search bar within the youtube platform.
    Then the searchQuery is typed in and searched for.
    Then a validation is made to make sure that the title of the second video contains the expectedTitle.
    Then the second video is clicked into to view as it is the correct expected video result.
*/
test('Video 2 Test', async ({ page }) => {
    // Use the fixture
    await clickOnSearchField(page);
  
    // Verify that the search input field is focused
    const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
    expect(isSearchInputFocused).toBeTruthy();
  
    // Variables for strings
    const searchQuery = 'primitive technology: crab and fish trap';
    const expectedTitle = 'Primitive Technology: Crab and Fish Trap';
  
    // Type search query
    await page.fill('input#search', searchQuery);
  
    // Click on search button
    await page.click('button#search-icon-legacy');
  
    // Wait for the search results to load
    await page.waitForSelector('ytd-video-renderer');
  
    // Get text content of the first search result
    const firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);

    // Assert that the first search result contains "Primitive Technology: Crab and Fish Trap"
    expect(firstSearchResult).toContain(expectedTitle);

    // Click on the first video in the search results
    await page.click('ytd-video-renderer');
  
  });
  
  test('Video 2 Test Search After', async ({ page }) => {
    // Use the fixture
    await clickOnSearchField(page);
  
    // Verify that the search input field is focused
    let isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
    expect(isSearchInputFocused).toBeTruthy();
  
    // Variables for strings
    let searchQuery = 'primitive technology: crab and fish trap';
    let expectedTitle = 'Primitive Technology: Crab and Fish Trap';
  
    // Type search query
    await page.fill('input#search', searchQuery);
  
    // Click on search button
    await page.click('button#search-icon-legacy');
  
    // Wait for the search results to load
    await page.waitForSelector('ytd-video-renderer');
  
    // Get text content of the first search result
    let firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);

    // Assert that the first search result contains "Primitive Technology: Crab and Fish Trap"
    expect(firstSearchResult).toContain(expectedTitle);

    // Click on the first video in the search results
    await page.click('ytd-video-renderer');

    /*there is some strange flakiness that is occurring only for chromium and not firefox. Putting a small timeout fixes the flakiness issue as chromium may have some rendering lag right after clicking into a video, whereas firefox does not. 
    */
    await page.waitForTimeout(1000);

    // Wait for the search input field to be ready
    await page.waitForSelector('input#search');
  
    // Click on the search input field
    await page.click('input#search');

    // Wait for a brief moment to ensure that the input field is focused
    await page.waitForTimeout(1000);

    
    isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
    expect(isSearchInputFocused).toBeTruthy();

    // Variables for strings
    searchQuery = 'jack sparrow';
    expectedTitle = 'Jack Sparrow (feat. Michael Bolton)';

    // Type search query
    await page.fill('input#search', searchQuery);
  
    // Click on search button
    await page.click('button#search-icon-legacy');

    // Wait for the search results to load
    await page.waitForSelector('ytd-video-renderer');

    // Get text content of the first search result
    firstSearchResult = await page.$eval('ytd-video-renderer', (video) => video.textContent);

    // Assert that the first search result contains "Jack Sparrow (feat. Michael Bolton)"
    expect(firstSearchResult).toContain(expectedTitle);

    // Click on the first video in the search results
    await page.click('ytd-video-renderer');    
  });