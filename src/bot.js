const { Telegraf } = require('telegraf');
const path = require('path');
const fs = require('fs');
const { isOnSpamWatch } = require('./plugins/lib-spamwatch/spamwatch.js');
require('@dotenvx/dotenvx').config({ path: "config.env" });
require('./plugins/ytdlp-wrapper.js');
// require('./plugins/termlogger.js');

const bot = new Telegraf(process.env.botToken);
const MAX_RETRIES = 5;
let restartCount = 0;

const loadCommands = () => {
  const commandsPath = path.join(__dirname, 'commands');

  try {
    const files = fs.readdirSync(commandsPath);
    files.forEach((file) => {
      try {
        const command = require(path.join(commandsPath, file));
        if (typeof command === 'function') {
          command(bot, isOnSpamWatch);
        }
      } catch (error) {
        console.error(`Failed to load command file ${file}: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`Failed to read commands directory: ${error.message}`);
  }
};

const startBot = async () => {
  try {
    await bot.launch();
    console.log('Bot is running...');
    restartCount = 0;
  } catch (error) {
    console.error('Failed to start bot:', error.message);
    if (restartCount < MAX_RETRIES) {
      restartCount++;
      console.log(`Retrying to start bot... Attempt ${restartCount}`);
      setTimeout(startBot, 5000);
    } else {
      console.error('Maximum retry attempts reached. Exiting.');
      process.exit(1);
    }
  }
};

const handleShutdown = (signal) => {
  console.log(`Received ${signal}. Stopping bot...`);
  bot.stop(signal);
  process.exit(0);
};

process.once('SIGINT', () => handleShutdown('SIGINT'));
process.once('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  console.error(error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

loadCommands();
startBot();
