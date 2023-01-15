const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { generateUuid1, generateUuid4 } = require('./src/uuid');
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const commands = [
  { command: '/uuid1', description: 'Gera um UUID versão 1' },
  { command: '/uuid4', description: 'Gera um UUID versão 4' },
  { command: '/uuid4 {quantidade}', description: 'Gera uma quantidade específica de UUIDs versão 4' },
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [
      [
        { text: 'UUID versão 1', callback_data: 'uuid1' },
        { text: 'UUID versão 4', callback_data: 'uuid4' }
      ],

      [{ text: 'Ajuda', callback_data: 'help' }]

    ]
  };
  bot.sendMessage(chatId, 'Selecione uma opção:', { reply_markup: JSON.stringify(keyboard) });
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;

  switch (data) {
    case 'uuid1':
      const uuid1 = generateUuid1();
      bot.sendMessage(chatId, uuid1, { parse_mode: 'markdown' });
      break;
    case 'uuid4':
      const uuid4 = generateUuid4();
      bot.sendMessage(chatId, uuid4, { parse_mode: "Markdown" });
      break;
    case 'help':
      let response = "Lista de comandos disponíveis: \n";
      commands.forEach(cmd => {
        response += `${cmd.command} - ${cmd.description}\n`;
      });
      bot.sendMessage(chatId, response);
      break;
  }
});

bot.onText(/\/uuid4( \d+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const count = match[1] ? parseInt(match[1]) : 1;
  let uuids = generateUuid4(count);
  bot.sendMessage(chatId, uuids, { parse_mode: "Markdown" });
});
