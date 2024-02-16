const { test, expect } = require('@playwright/test');

async function clickOnSearchField(page) {
    // Navigate to YouTube
    await page.goto('https://www.youtube.com/');
  
    // Wait for the search input field to be ready
    await page.waitForSelector('input#search');
  
    // Click on the search input field
    await page.click('input#search');
  
    // Return whether the search input field is focused
    const isSearchInputFocused = await page.$eval('input#search', input => input === document.activeElement);
    return isSearchInputFocused;
  }
  
  module.exports = {
    clickOnSearchField
  };