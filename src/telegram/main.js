const {
    BOT_PANEL,
    BOT_NAME,
    BOT_USERNAME,
    COMMANDS
} = require('./common');
const CommandModule = require('./commands/init');
const CallBacks = require('./callbacks/init');
const Listeners = require('./listen/init');
const LOG_UTILS = require('../utils/log-utils');
const TLGBOT_SERVICE = {
    async initBot(config) {
        return new Promise((res, rej) => {
            const bot = BOT_PANEL;
            try {
                bot.telegram.setMyCommands(
                    config.command
                ).then(value => {
                    CommandModule.init(bot);
                    CallBacks.initCallbacks(bot);
                    Listeners.init(bot);
                    bot.launch();
                    LOG_UTILS.reqLogger.tlgrmlogger.info(`${BOT_NAME} Bot started\nUsernane : ${BOT_USERNAME}`);
                    res(value);
                }).catch(err => {
                    LOG_UTILS.reqLogger.tlgrmlogger.error('une erreur s\'est produite');
                    console.log(err);
                    rej(err);
                });

            } catch (error) {
                LOG_UTILS.reqLogger.tlgrmlogger.error('une erreur s\'est produite');
                console.log(error);
                rej(error);
            }

        });
    }
}
module.exports = TLGBOT_SERVICE;