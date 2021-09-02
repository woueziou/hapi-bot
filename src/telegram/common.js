const {
    Telegraf
} = require('telegraf');

const BOT_PANEL = new Telegraf(process.env.BOT_KEY);
const BOT_NAME = process.env.BOT_NAME;
const BOT_USERNAME = process.env.BOT_USERNAME;

const COMMANDS = [{
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




module.exports = {
    BOT_NAME,
    BOT_PANEL,
    BOT_USERNAME,
    COMMANDS,
};