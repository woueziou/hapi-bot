require('dotenv').config();
const HapiServer = require('./src/hapi/main');
const TLGBOT_SERVICE = require('./src/telegram/main');
const {
    TelegramConfig
} = require('./src/services/core/config.service')
const startServices = async () => {
    HapiServer.start();
    await TelegramConfig.init();
    const config = await TelegramConfig.getConfigs();
    TLGBOT_SERVICE.initBot(config);
}
startServices();