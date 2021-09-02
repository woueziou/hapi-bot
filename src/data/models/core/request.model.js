const {
    Schema
} = require('mongoose');
const mdb = require('../../datasources/mongo');
const moment = require('moment');
const schema = {
    client_id: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: true
    },
    receiver_phone: {
        type: String,
        required: false,
        default: ''
    },
    sender_phone: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    date_create: {
        type: Number,
        default: moment().unix()
    },
    date_handle: {
        type: Number,
        default: 0
    },
    canceled: {
        type: Boolean,
        default: false
    },
    done: {
        type: Boolean,
        default: false
    },

};
const RequestModel = mdb.model('Request', new Schema(schema, {
    collection: 'Requests'
}));
module.exports = RequestModel;