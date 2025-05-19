const puppeteer = require("puppeteer");
const gifEncoder = require("gif-encoder-2");
const fs = require("fs");

async function generateWaveGif() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1200, height: 150 });

  // Load the wave animation HTML
  await page.goto("file://" + __dirname + "/wave-animation.html");

  // Wait for animation to load
  await page.waitForTimeout(1000);

  // Create GIF encoder
  const encoder = new gifEncoder(1200, 150);
  encoder.setDelay(50);
  encoder.start();

  // Capture frames
  for (let i = 0; i < 60; i++) {
    const screenshot = await page.screenshot();
    encoder.addFrame(screenshot);
    await page.waitForTimeout(50);
  }

  // Save GIF
  encoder.finish();
  const buffer = encoder.out.getData();
  fs.writeFileSync("wave-animation.gif", buffer);

  await browser.close();
}

generateWaveGif().catch(console.error);
