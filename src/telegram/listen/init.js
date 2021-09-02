const {
    TelegramConfig
} = require('../../services/core/config.service');


const listenText = (bot) => {
    bot.on('text', async (ctx) => {
        console.log(ctx.message.text);
        const keys = await TelegramConfig.getKeywords();
        const word = ctx.message.text;
        if (keys.includes(word)) {
            switch (word) {
                case 'CC':

                    break;

                default:
                    break;
            }
        }

        // await ctx.reply(searchResult);

    });
};

const init = async (bot) => {
    return new Promise((res) => {
        listenText(bot);
        res();
    });
};

module.exports = {
    init
};