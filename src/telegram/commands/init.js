const startCmd = require('./start');
// const makeTransfert = require('./make-transacation');
const {
    TRANSFERT_MENU
} = require('../common');
const {
    TelegramConfig
} = require('../../services/core/config.service');
const initWelcome = (bot) => {
    bot.command('start', async ctx => {
        const greeting = await TelegramConfig.getGreetings();
        ctx.reply(`${greeting}`);
        startCmd(ctx);
    });
};


const initHelp = (bot) => {
    // eslint-disable-next-line no-unused-vars
    bot.command('aide', async ctx => {

    });
};

const initContact = (bot) => {

    // eslint-disable-next-line no-unused-vars
    bot.command('contact', async ctx => {

    });
};




const initHistory = (bot) => {
    // eslint-disable-next-line no-unused-vars
    bot.command('historique', async (ctx) => {

    });

};

const initTransfert = (bot) => {
    bot.command('transferer', async (ctx) => {
        ctx.reply('Quel transfert voulez-vous effecter', {
            reply_markup: {
                'inline_keyboard': TRANSFERT_MENU
            }
        });
    });

};

const init = async (bot) => {
    return Promise.all([
        initWelcome(bot),
        initHelp(bot),
        initContact(bot),
        initHistory(bot),
        initTransfert(bot),

    ]);
};

module.exports = {
    init
};