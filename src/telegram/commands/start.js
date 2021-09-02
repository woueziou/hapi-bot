// const tlgconfig = require('../common');

const ClientService = require('../../services/core/client.service');

const startCmd = async (ctx) => {
    // await ctx.reply(`Salut ${ctx.from.first_name} ${ctx.from.last_name}`);
    await ClientService.saveUser({
        id: ctx.from.id,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name
    }, 'TELEGRAM');
};
module.exports = startCmd;