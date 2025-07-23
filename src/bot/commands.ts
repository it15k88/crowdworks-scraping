import config from "@/config";
import { Telegraf } from "telegraf";
import { getScrapingStatus, startScraping, stopScraping } from "@/scraper";

const commands: {
  command: string;
  description: string;
}[] = [
  { command: "start", description: "Start the bot" },
  {
    command: "start_scraping",
    description: "Start scraping job postings",
  },
  {
    command: "stop_scraping",
    description: "Stop scraping job postings",
  },
];

const setup_commands = async (bot: Telegraf) => {
  await bot.telegram.setMyCommands(commands);

  bot.start(async (ctx) => {
    try {
      await ctx.reply(
        `Welcome to the *CrowedWorks Scraping Bot*, please select one of the following options.\n\n If you need assistance, please contact @it15k88`,
        {
          parse_mode: "Markdown",
        }
      );
    } catch (error) {
      console.error("Error in /start:", error);
      await ctx.reply("An error occurred. Please try again later.");
    }
  });

  let canStart = false;

  bot.command("start_scraping", async (ctx) => {
    try {
      const userId = ctx.update.message.from.id;
      if (config.ADMIN_ID !== userId.toString())
        return await ctx.reply(`🚫 This command is for admin only.`);

      const scraping = getScrapingStatus();

      if (scraping) return await ctx.reply("Scraping is already ongoing.");

      if (!canStart)
        return await ctx.reply("Scraping is not allowed to start for now.");

      await ctx.reply("🔍 Scraping started.");
      startScraping();
    } catch (error) {
      console.error("Error in /start_scraping:", error);
      await ctx.reply("An error occurred. Please try again later.");
    }
  });

  bot.command("stop_scraping", async (ctx) => {
    try {
      const userId = ctx.update.message.from.id;
      if (config.ADMIN_ID !== userId.toString())
        return await ctx.reply(`🚫 This command is for admin only.`);

      const scraping = getScrapingStatus();

      if (!scraping) return await ctx.reply("Scraping is not ongoing.");

      canStart = false;

      setTimeout(() => {
        canStart = true;
      }, 60000);

      await ctx.reply("🛑 Scraping stopped.");
      stopScraping();
    } catch (error) {
      console.error("Error in /stop_scraping:", error);
      await ctx.reply("An error occurred. Please try again later.");
    }
  });
};

export default setup_commands;
