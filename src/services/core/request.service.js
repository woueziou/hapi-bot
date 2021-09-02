const RequestModel = require('../../data/models/core/request.model');
const ClientService = require('./client.service');
const moment = require('moment');
const {
    log
} = require('console');
const RequestService = {
    /**
     * Create new request
     * @param {*} clientid 
     */
    async create(clientid, command) {
        return new Promise((res, rej) => {
            RequestModel({
                client_id: clientid,
                command: command,
            }).save().then(value => {
                res(value);
            }).catch(err => {
                rej(err);
            });
        });
    },


    /**
     * 
     * @param {String} requestId Request id
     * @param {Boolean} canceled true if the user is canceled by the user
     * @returns 
     */
    async endRequest(requestId, canceled) {
        return new Promise((res, rej) => {
            RequestModel.findOne({
                _id: requestId,
                canceled: false,
                done: false,
            }).then(value => {
                if (!value) {
                    rej('Pas de requête actuellement');
                }
                if (!canceled) {
                    canceled = false;
                }
                RequestModel.updateOne({
                    _id: value._id,
                }, {
                    canceled: canceled,
                    done: true,
                    date_handle: moment().unix()
                }).then(result => {
                    res(result);
                }).catch(err => {
                    rej(err);
                });
            }).catch(err => {
                // console.log(err);
                rej(err);
            });
        });
    },

    /**
     * Set the request to end
     * @param {RequestModel} request
     */
    async updateRequest(request) {
        return new Promise((res, rej) => {
            RequestModel.findByIdAndUpdate(request._id, request, {
                new: true
            }).then(req => {
                res(req);
            }).catch(err => {
                rej(err);
            });
        });
    },
    /**
     * Set the request to end
     * @param {RequestModel} request
     */
    async handleRequest(requestId) {
        return new Promise((res, rej) => {
            RequestModel.findOne({
                _id: requestId,
                done: false,
                canceled: false
            }).then(req => {
                if (!req) {
                    rej('Aucune requête');
                    return;
                }
                // handle request 
                this.endRequest(requestId); // set the request as done
                log(req);
                res();
            }).catch(err => {
                rej(err);
            });
        });
    },

    /**
     * Set the request to end
     * @param {RequestModel} request
     */
    async getRequetBySocialId(socialId) {
        return new Promise((res, rej) => {
            ClientService.getClientBySocialId(socialId).then(async client => {
                try {
                    const req = await RequestModel.findOne({
                        client_id: client._id,
                        done: false,
                        canceled: false
                    }).exec();
                    // log(req);
                    return res(req);
                } catch (err) {
                    log(err);
                    rej('Aucune requête trouvée');
                }
            }).catch(err => {
                log(err);
                rej(err);
            });
        });
    }
};
module.exports = RequestService;