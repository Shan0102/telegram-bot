import TgAPI from "node-telegram-bot-api";

import storage from "../data/storage";
import { getBot } from "../services/botService";
import { createPassword } from "../functions/randomPassword";

const welcome = async (chatId: number) => {
    const bot = getBot();

    await bot.sendSticker(
        chatId,
        "CAACAgIAAxUAAWhRkXrr0QT5iH0yM0CJsvrUGHqFAAKGFwAC3kpwSOTDV2Dr3oVyNgQ"
    );
    await bot.sendMessage(chatId, "Welcome to my tg BOT");
};

const defaultAnswer = async (chatId: number) => {
    const bot = getBot();
    await bot.sendSticker(
        chatId,
        "CAACAgIAAxUAAWhUZAx8m6SdxCnw8SZHugY4ODsGAAJ7HAAC6NVQSVDYYIRiun3BNgQ"
    );
    await bot.sendMessage(chatId, `I don't understand`);
};

const startGame = async (chatId: number) => {
    const bot = getBot();
    const gameOptions: TgAPI.SendMessageOptions = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "1", callback_data: "guess 1" },
                    { text: "2", callback_data: "guess 2" },
                    { text: "3", callback_data: "guess 3" },
                ],
                [
                    { text: "4", callback_data: "guess 4" },
                    { text: "5", callback_data: "guess 5" },
                    { text: "6", callback_data: "guess 6" },
                ],
                [
                    { text: "7", callback_data: "guess 7" },
                    { text: "8", callback_data: "guess 8" },
                    { text: "9", callback_data: "guess 9" },
                ],
                [{ text: "0", callback_data: "guess 0" }],
            ],
        },
    };

    const msg = await bot.sendMessage(chatId, "can you guess the number from 0 to 9", gameOptions);
    const randomNum = Math.floor(Math.random() * 10);

    if (!storage.random_nums[chatId]) storage.random_nums[chatId] = {};
    storage.random_nums[chatId][msg.message_id] = randomNum;
};

const prepareForStickers = async (chatId: number) => {
    const bot = getBot();
    storage.awaiting[chatId] = "awaiting_sticker";
    await bot.sendMessage(chatId, "Send a sticker you want to get a set from");
};

const getAllStickersId = async (chatId: number, sticker: TgAPI.Sticker | undefined) => {
    const bot = getBot();
    if (!sticker) return await bot.sendMessage(chatId, `I was waiting for sticker`);
    if (!sticker.set_name) return await bot.sendMessage(chatId, `This sticker has no set name`);

    const { stickers } = await bot.getStickerSet(sticker.set_name);

    let msg = "";
    for (let s of stickers) msg += `${s.emoji}: ${s.file_id}\n`;

    bot.sendMessage(chatId, msg);
};

const prepareForNumber = async (chatId: number) => {
    const bot = getBot();
    storage.awaiting[chatId] = "awaiting_number";
    await bot.sendMessage(chatId, "Send a number you want your password's length");
};

const sendRandomPassword = async (chatId: number, text: string | undefined) => {
    const bot = getBot();
    if (!text || isNaN(parseInt(text))) {
        return await bot.sendMessage(chatId, `I was waiting a number`);
    }

    const randomPassword = createPassword(parseInt(text));
    await bot.sendMessage(chatId, randomPassword);
};

export {
    defaultAnswer,
    welcome,
    startGame,
    prepareForStickers,
    getAllStickersId,
    prepareForNumber,
    sendRandomPassword,
};
