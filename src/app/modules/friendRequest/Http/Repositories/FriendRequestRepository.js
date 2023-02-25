import FriendListModel from "../../../../Models/friend/FriendListModel.js";

export class FriendRequestRepository {

	friendListModel;
	constructor() {
		this.friendListModel = FriendListModel;
	}

	async create(userID) {
		return await this.friendListModel.create({userID});
	}

	async updateSentFriendRequests(_id, receivedBy) {
		return await this.friendListModel.updateOne({_id}, {
			$push: {
				sentFriendRequests: {
					receivedBy,
				}
			}
		});
	}

	async updateReceivedFriendRequests(_id, sentBy) {
		return await this.friendListModel.updateOne({_id}, {
			$push: {
				receivedFriendRequests: {
					sentBy,
				}
			}
		});
	} 

	async findByUserId(userID) {
		return await this.friendListModel.findOne({userID});
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
					localField: "sentFriendRequests.receivedBy",
					foreignField: "_id",
					as: "sentFriendRequests"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "receivedFriendRequests.sentBy",
					foreignField: "_id",
					as: "receivedFriendRequests"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "friends.friendID",
					foreignField: "_id",
					as: "friends"
				}
			},
			{
				$project: {
					userID: 0,
					__v: 0,
					"sentFriendRequests.first_name": 0,
					"sentFriendRequests.last_name": 0,
					"sentFriendRequests.email": 0,
					"sentFriendRequests.password": 0,
					"sentFriendRequests.createdAt": 0,
					"sentFriendRequests.updatedAt": 0,
					"sentFriendRequests.deletedAt": 0,
					"sentFriendRequests.uuid": 0,
					"sentFriendRequests.phones": 0,
					"sentFriendRequests.address": 0,
					"sentFriendRequests.__v": 0,
				}
			}
		]);
	}
}