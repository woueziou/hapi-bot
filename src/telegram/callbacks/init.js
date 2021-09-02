const initCallbacks = async (bot) => {

    bot.on('callback_query', async (ctx) => {
        console.log(ctx);
    });
    // })
};

module.exports = {
    initCallbacks
};