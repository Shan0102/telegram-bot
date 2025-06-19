import dotenv from "dotenv";
dotenv.config();

import { initBot } from "./services/botService";
import * as handleCommands from "./controllers/commands";
import * as handleCallbacks from "./controllers/callbacks";
import storage from "./data/storage";

const bot = initBot(process.env.TELEGRAM_TOKEN ?? "");

// set initial commands
bot.setMyCommands([
    { command: "/start", description: "bot start message" },
    { command: "/game", description: "guess the number" },
    { command: "/stickers", description: "get all stickers' id" },
    { command: "/password", description: "create random password" },
]);

// handle incoming messages and commands
bot.on("message", async (msg) => {
    console.log(msg);

    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") await handleCommands.sendWelcome(chatId);
    else if (text === "/game") await handleCommands.sendGameStart(chatId);
    else if (text === "/stickers") return await handleCommands.sendPrepareForStickers(chatId);
    else if (text === "/password") return await handleCommands.sendPrepareForNumber(chatId);
    else if (chatId in storage.awaiting) {
        if (storage.awaiting[chatId] === "awaiting_sticker") {
            await handleCommands.sendAllStickersId(chatId, msg.sticker);
        } else if (storage.awaiting[chatId] === "awaiting_number") {
            await handleCommands.sendRandomPassword(chatId, text);
        }
    } else await handleCommands.sendDefaultAnswer(chatId);

    delete storage.awaiting[chatId];
});

// handle callback queries
bot.on("callback_query", (query) => {
    console.log(query);

    const chatId = query.message?.chat.id;
    const data = query.data;
    const messageId = query.message?.message_id;
    const queryId = query.id;

    if (data?.match(/^guess\s.*/) && messageId)
        handleCallbacks.sendIsGuessRight(chatId, data.slice(6), messageId, queryId);
    if (data === "/newgame") handleCallbacks.sendNewGame(chatId, queryId);
});
