import cron from "node-cron";
import { scrapeSydneyEvents } from "../services/scraper.service.js";

const startScrapeJob = () => {
  console.log("🕷️ Initial scrape started...");
  scrapeSydneyEvents(); // run immediately

  cron.schedule("0 */6 * * *", async () => {
    console.log("⏰ Scheduled scrape running...");
    await scrapeSydneyEvents();
  });
};

export default startScrapeJob; // 👈 THIS LINE IS REQUIRED
