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
}