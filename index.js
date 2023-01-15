const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const uuid = require('uuid');
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/uuid1/, (msg) => {
  const chatId = msg.chat.id;
  const uuid1 = uuid.v1();
  bot.sendMessage(chatId, uuid1, {parse_mode: "Markdown"});
});

bot.onText(/\/uuid4/, (msg) => {
  const chatId = msg.chat.id;
  const uuid4 = uuid.v4();
  bot.sendMessage(chatId, uuid4, {parse_mode: "Markdown"});
});

bot.onText(/\/uuid4 (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const amount = match[1];
  let uuids = "";
  for (let i = 0; i < amount; i++) {
    uuids += uuid.v4() + "\n";
  }
  bot.sendMessage(chatId, uuids, {parse_mode: "Markdown"});
});
