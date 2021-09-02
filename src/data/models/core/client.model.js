const {
    Schema
} = require('mongoose');
const mdb = require('../../datasources/mongo');
const moment = require('moment');
const schema = {
    social_id: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
    channel: {
        type: String,
        required: true
    },
    date_created: {
        type: Number,
        default: moment().unix()
    },
};
const Client = mdb.model('Client', new Schema(schema, {
    collection: 'Clients'
}));
module.exports = Client;