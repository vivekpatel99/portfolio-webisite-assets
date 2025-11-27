const { chromium } = require('playwright');

async function captureAllSections() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take full page screenshot
  await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true });

  // Take viewport screenshots as we scroll
  const sections = [
    { name: 'hero', selector: '#hero' },
    { name: 'techstack', selector: '#techstack' },
    { name: 'services', selector: '#services' },
    { name: 'about', selector: '#about' },
    { name: 'experience', selector: '#experience' },
    { name: 'portfolio', selector: '#portfolio' },
    { name: 'testimonials', selector: '#testimonials' },
    { name: 'stats', selector: '#stats' },
    { name: 'connect', selector: '#connect' },
    { name: 'cta', selector: 'section:has(a[href="/contact"])' }
  ];

  for (const section of sections) {
    try {
      const element = await page.$(section.selector);
      if (element) {
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await element.screenshot({ path: `screenshots/${section.name}.png` });
        console.log(`Captured: ${section.name}`);
      } else {
        console.log(`Section not found: ${section.name} (${section.selector})`);
      }
    } catch (e) {
      console.log(`Error capturing ${section.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureAllSections();
