const { execSync } = require("child_process");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const cheerio = require("cheerio");

// تثبيت Chrome & Chromedriver في Replit
execSync("nix-env -iA nixpkgs.chromium nixpkgs.chromedriver");

// تشغيل Selenium
async function getEpisodeLinks(episodeUrl) {
  let options = new chrome.Options();
  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(episodeUrl);
    await driver.wait(until.elementLocated(By.css("input[type='hidden'][name^='watch_']")), 10000);

    let elements = await driver.findElements(By.css("input[type='hidden'][name^='watch_']"));
    let videoLinks = [];

    for (let element of elements) {
      let encodedData = await element.getAttribute("value");

      if (encodedData) {
        let decodedJson = Buffer.from(encodedData, "base64").toString("utf-8");
        let videoData = JSON.parse(decodedJson);

        for (let entry of videoData) {
          if (entry.link.startsWith("http")) {
            videoLinks.push(entry.link);
          }
        }
      }
    }

    return videoLinks;
  } finally {
    await driver.quit();
  }
}

module.exports = { getEpisodeLinks };
