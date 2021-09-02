const ClientModel = require('../../data/models/core/client.model');
// const LOG_UTILS = require('../utils/log-utils');
const _ = require('lodash');
const {
	error,
	log
} = require('console');
// const EnrollService = require('./enroll.service');
const ClientService = {
	/**
	 * 
	 * @param {Object} user 
	 * @param {String} channel 
	 */
	async saveUser(user, channel) {
		return new Promise((res, rej) => {
			ClientModel.find({
				social_id: user.id
			}).then(async clientList => {
				if (clientList.length > 0) {
					console.log('User exist');
					return res();
				}
				ClientModel({
					social_id: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					channel: channel,
				}).save().then(client => {
					res(client);
				}).catch(err => {
					log(err);
					rej(err);
				});
			}).catch(err => {
				error(err);
				rej(err);
			});
		});
	},

	/**
	 * 
	 * @param {String} id 
	 * @returns UserModel || null
	 */
	async lookup(id) {
		return new Promise((resolve, reject) => {
			try {
				ClientModel.findOne({
					_id: id
				}).then(searchResult => {
					resolve(searchResult);
				}).catch(err => {
					reject(err);
				});

			} catch (error) {
				reject(error);
			}

		});

	},
	async getClientBySocialId(socialId) {
		return new Promise((resolve, reject) => {
			try {
				ClientModel.findOne({
					social_id: socialId
				}).then(searchResult => {
					// log(searchResult);
					resolve(searchResult);
				}).catch(err => {
					error(err);
					reject(err);
				});
			} catch (err) {
				error(err);
				reject(err);
			}

		});
	},

	async getAllClients() {
		return new Promise((res, rej) => {
			ClientModel.find().then(value => {
				let result = [];
				_.forEach(value, (v) => {
					result.push({
						id: v._id,
						social_id: v.social_id,
						last_name: v.last_name,
						channel: v.channel,
						first_name: v.first_name,
						date_join: v.date_contact
					});
				});
				res(result);
			}).catch(err => rej(err));
		});
	},

	async sanitizeUsers() {
		const listUser = await ClientModel.find().distinct('id').exec();
		_.forEach(listUser, (value) => {
			ClientModel.find({
				id: value
			}).then((duplicated_data_list) => {
				let i = duplicated_data_list.length;
				while (i > 1) {
					ClientModel.findByIdAndDelete(duplicated_data_list[i - 1]._id).then(val => {
						console.log(val);
					}).catch(err => {
						console.log(err);
					});
					i--;
				}
			});
		});
		return listUser;
	}

};

module.exports = ClientService;