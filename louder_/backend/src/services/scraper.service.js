import puppeteer from "puppeteer";
import Event from "../models/Event.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const scrapeSydneyEvents = async () => {
  let browser;

  try {
    console.log("🕷️ Scraping Sydney events (Stable Mode)...");

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://www.timeout.com/sydney/things-to-do", {
      waitUntil: "domcontentloaded",
    });

    // ⏳ JS-safe delay (works in all Puppeteer versions)
    await delay(5000);

    const events = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));

      return links
        .filter(
          (a) =>
            a.href &&
            a.href.includes("/things-to-do/") &&
            a.innerText &&
            a.innerText.trim().length > 10
        )
        .slice(0, 30)
        .map((el) => ({
          title: el.innerText.trim(),
          originalUrl: el.href,
        }));
    });

    console.log("🔎 Found", events.length, "events");

    for (const e of events) {
      await Event.findOneAndUpdate(
        { originalUrl: e.originalUrl },
        {
          title: e.title,
          city: "Sydney",
          source: "TimeOut",
          status: "new",
          dateTime: new Date(),
          lastScrapedAt: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    console.log("✅ Scraping completed");
  } catch (err) {
    console.error("❌ Scraping failed:", err);
  } finally {
    if (browser) await browser.close();
  }
};
