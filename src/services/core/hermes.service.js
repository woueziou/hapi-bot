const LOG_UTILS = require('../utils/log-utils');
const HermesHistoryModel = require('../../data/models/core/hermes-history.model');
const HermesService = {

    async saveMessage(message) {
        try {
            const data = new HermesHistoryModel({
                content: message.content,
                sender: message.sender,
                receiver: message.receiver,
                social_id: message.social_id
            });
            data.save(function (err) {
                if (err) {
                    LOG_UTILS.reqLogger.hermesLogger.error(err);
                    return;
                }
                LOG_UTILS.reqLogger.hermesLogger.info(`Message -  ${data._id} `);
                // saved!
            });
        } catch (err) {
            // console.log(message);
            // console.log(err);
            LOG_UTILS.reqLogger.hermesLogger.error(err);
        }
    },



};

module.exports = HermesService;