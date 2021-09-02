const {
    TelegramModel
} = require('../../data/models/core/telegram.config.model');
const _ = require('lodash');
const TelegramConfig = {
    async init() {
        try {
            const configs = await TelegramModel.find().exec();
            if (configs.length > 0) {
                return;
            }
            let commande = [{
                    command: 'historique',
                    description: 'Vos opérations'
                },
                {
                    command: 'reclamation',
                    description: 'Faire une réclamation'
                },
                {
                    command: 'aide',
                    description: 'Obtenir de l\'aide'
                },
                {
                    command: 'contact',
                    description: 'Nous contacter'
                }
            ];
            await TelegramModel.create({
                BOT_NAME: process.env.BOT_NAME,
                command: commande,
                greetings: [`Bonjour\nJe suis ${process.env.BOT_NAME} votre assistant d'achat \nComment puis-je vous aider?`]
            });
        } catch (err) {

            // log(err);
        }
    },


    async getConfigs() {
        const configs = await TelegramModel.find().exec();
        if (_.isEmpty(configs)) {
            return false;
        }
        return configs[0];
    },
    async getGreetings() {
        const configs = await TelegramModel.find().exec();
        if (_.isEmpty(configs)) {
            return 'Salut';
        }
        const greetings = _.shuffle(configs[0].greetings);
        return greetings[0];
    },
    async getKeywords() {
        const configs = await TelegramModel.find().exec();
        if (_.isEmpty(configs)) {
            return [];
        }
        const keys = configs[0].keys;
        return keys;
    }
};
module.exports = {
    TelegramConfig
};