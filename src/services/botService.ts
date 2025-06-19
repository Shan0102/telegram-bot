import TgAPI from "node-telegram-bot-api";

let bot: TgAPI | null = null;

const initBot = (token: string) => {
    bot = new TgAPI(token, { polling: true });
    return bot;
};

const getBot = () => {
    if (!bot) throw new Error("Bot is not initialized");
    return bot;
};

export { initBot, getBot };
