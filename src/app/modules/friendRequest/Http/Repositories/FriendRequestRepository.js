import FriendListModel from "../../../../Models/friend/FriendListModel.js";

export class FriendRequestRepository {

	friendListModel;
	constructor() {
		this.friendListModel = FriendListModel;
	}

	async create(userID) {
		return await this.friendListModel.create({userID});
	}

	async findByUserId(userID) {
		return await this.friendListModel.findOne({userID});
	}

	async findFriendRequest(friendRequestId) {
		return await this.friendListModel.find({id: friendRequestId});
	}

	async findFrendRequestSent(id) {
		return await this.friendListModel.findOne({"sentFriendRequests.id": id});
	}

	async updateSentFriendRequests(_id, receivedBy, id) {
		return await this.friendListModel.updateOne({_id}, {
			$push: {
				sentFriendRequests: {
					receivedBy,
					id,
				}
			}
		});
	}

	async updateReceivedFriendRequests(_id, sentBy, id) {
		return await this.friendListModel.updateOne({_id}, {
			$push: {
				receivedFriendRequests: {
					sentBy,
					id,
				}
			}
		});
	} 

	async aggregateFriendRequests(userID) {
		return await this.friendListModel.aggregate([
			{
				$match: {
					userID,
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "friends.friendID",
					foreignField: "_id",
					as: "friends"
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "userID",
					foreignField: "userID",
					as: "posts"
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "sentFriendRequests.receivedBy",
					foreignField: "_id",
					as: "receivedByUser"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "receivedFriendRequests.sentBy",
					foreignField: "_id",
					as: "sentByUser"
				}
			},
			{
				$addFields: {
					"sentFriendRequests.username": { $arrayElemAt: [ "$receivedByUser.username", 0 ] },
					"sentFriendRequests.uuid": { $arrayElemAt: [ "$receivedByUser.uuid", 0 ] },
					"sentFriendRequests.avatar_url": { $arrayElemAt: [ "$receivedByUser.avatar_url", 0 ] },
					
					"receivedFriendRequests.username": { $arrayElemAt: [ "$sentByUser.username", 0 ] },
					"receivedFriendRequests.uuid": { $arrayElemAt: [ "$sentByUser.uuid", 0 ] },
					"receivedFriendRequests.avatar_url": { $arrayElemAt: [ "$sentByUser.avatar_url", 0 ] },
				}
			},
			{
				$project: {
					userID: 0,
					_id: 0,
					__v: 0,
					sentByUser: 0,
					receivedByUser: 0,

					"receivedFriendRequests": {
						_id: 0,
						sentBy: 0,
					},

					"sentFriendRequests": {
						_id: 0,
						receivedBy: 0,
					},

					"friends": {
						_id: 0,
						first_name: 0,
						last_name: 0,
						email: 0,
						password: 0,
						createdAt: 0,
						updatedAt: 0,
						deletedAt: 0,
						phones: 0,
						address: 0,
						__v: 0
					},

					"posts": {
						_id: 0,
						userID: 0,
						description: 0,
						updatedAt: 0,
						deletedAt: 0,
						__v: 0
					}
				}
			},
		]);
	}

	async acceptFriendRequest(_id, test) {
		return await this.friendListModel.updateOne({_id}, test);
	}
}