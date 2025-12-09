const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'http://localhost:3000/history';
  const out = 'D:/final_project/Project/frontend/history_screenshot.png';

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Navigate and wait until network idle
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => {
    console.error('Navigation error:', e.message);
  });

  // Wait for either a history card or an empty-state to appear
  try {
    await page.waitForSelector('.card', { timeout: 10000 });
  } catch (e) {
    // fallback: wait for the root element
    await page.waitForSelector('#root', { timeout: 10000 });
  }

  // Give React a little extra time to render content
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Screenshot the visible page
  await page.screenshot({ path: out, fullPage: true });
  console.log('Saved screenshot to', out);

  await browser.close();
})();
