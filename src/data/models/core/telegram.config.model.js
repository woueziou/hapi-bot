const {
    Schema
} = require('mongoose');
const mdb = require('../../datasources/mongo');
const moment = require('moment');


const commandSchema = {
    command: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const configSchema = {
    greetings: {
        type: [String],
        default: []
    },
    BOT_NAME: {
        type: String,
        default: process.env.BOT_NAME
    },
    command: {
        type: [commandSchema]
    },
    keys: {
        type: [String],
        default: []
    },
    date_created: {
        type: Number,
        default: moment().unix()
    }
}
const TelegramModel = mdb.model('TelegramModel', new Schema(configSchema, {
    collection: 'TelegramConfigs'
}));
module.exports = {
    configSchema,
    TelegramModel
};