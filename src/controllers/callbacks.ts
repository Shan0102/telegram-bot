import TgAPI from "node-telegram-bot-api";
import storage from "../data/storage";
import { getBot } from "../services/botService";

import * as handleCommands from "./commands";

// handle user guess
const sendIsGuessRight = async (
    chatId: number | undefined,
    data: string,
    messageId: number,
    queryId: string
) => {
    const bot = getBot();
    bot.answerCallbackQuery(queryId);

    if (!chatId) return;

    const guessOptions: TgAPI.SendMessageOptions = {
        reply_markup: {
            inline_keyboard: [[{ text: "play another game", callback_data: "/newgame" }]],
        },
    };

    const userNum = parseInt(data);
    if (isNaN(userNum)) throw new Error("number was expected in callback data");

    if (!storage.random_nums[chatId] || storage.random_nums[chatId][messageId] === undefined)
        return;
    const randomNum = storage.random_nums[chatId][messageId];

    delete storage.random_nums[chatId][messageId];
    if (Object.keys(storage.random_nums[chatId]).length === 0) delete storage.random_nums[chatId];

    await bot.deleteMessage(chatId, messageId);

    const text =
        randomNum === userNum ? "Yes, you guess right!" : `No, bot's number was ${randomNum}`;
    await bot.sendMessage(chatId, text, guessOptions);
};

// handle new game request
const sendNewGame = async (chatId: number | undefined, queryId: string) => {
    const bot = getBot();
    await bot.answerCallbackQuery(queryId);

    if (chatId) await handleCommands.sendGameStart(chatId);
};

export { sendIsGuessRight, sendNewGame };
