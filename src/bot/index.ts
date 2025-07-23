import config from "@/config";
import { Markup, Telegraf } from "telegraf";
import setup_commands from "./commands";
import { isEmpty } from "../utils";

const bot = new Telegraf(config.BOT_TOKEN);

setup_commands(bot);

export const sendMessage = async (
  chatId: string,
  text: string,
  url?: string,
  employer?: string
) => {
  try {
    let extra: any = {
      parse_mode: "HTML",
    };

    if (!isEmpty(url) && !isEmpty(employer)) {
      extra = {
        ...extra,
        ...Markup.inlineKeyboard([
          Markup.button.url("Explore Job", url),
          Markup.button.url("Employer", employer),
        ]),
      };
    }

    await bot.telegram.sendMessage(chatId, text, extra);
  } catch (error: any) {
    console.error(`Error sending message to chat ${chatId}`, error.message);
  }
};

export const launchBot = async () => {
  try {
    return await new Promise((resolve) => {
      bot.launch(() => {
        resolve("Bot started");
      });
    });
  } catch (error: any) {
    console.error("Error launching bot:", error.message);
    throw error;
  }
};
