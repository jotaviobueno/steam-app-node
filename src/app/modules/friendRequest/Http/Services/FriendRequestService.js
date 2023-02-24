import {notFound, badRequest} from "../../../../common/Errors/HandleHttpErrors.js";
import {UserRepository} from "../../../users/Http/Repositories/UserRepository.js";
import { FriendRequestRepository } from "../Repositories/FriendRequestRepository.js";

class FriendRequestService {
	
	userRepository;
	friendRequestRepository;
	constructor() {
		this.userRepository = new UserRepository();
		this.friendRequestRepository = new FriendRequestRepository();
	}

	async sendFriendRequest(user, user_uuid) {
		if (user.uuid === user_uuid)
			throw new badRequest("you cannot send friend request to yourself");

		const existingUser = await this.userRepository.findByUuid(user_uuid);

		if (!existingUser) {
			throw new notFound("User not found");
		}

		const friendRequestsSent = await this.friendRequestRepository.findByUserId(user._id);
		const friendRequestsReceived = await this.friendRequestRepository.findByUserId(existingUser._id);

		const friendIndex = friendRequestsSent.sentFriendRequests.findIndex(
			sent => sent.receivedBy.toString() === existingUser._id.toString()
		);

		if (friendIndex !== -1) 
			throw new badRequest("You have already sent a friend request to this user");

		const theresAPendingFriendRequest = friendRequestsSent.receivedFriendRequests.findIndex(
			received => received.sentBy.toString() === existingUser._id.toString() );

		if (theresAPendingFriendRequest !== -1) 
			throw new badRequest("You already have a friend request from this user");

		const areTheyAlreadyFriends = friendRequestsSent.friends.findIndex(
			friend => friend.friendID.toString() === existingUser._id.toString()
		);

		if (areTheyAlreadyFriends !== -1) 
			throw new badRequest("You are already friends with this user");
		

		const updateSentFriendRequests = await this.friendRequestRepository.updateSentFriendRequests(
			friendRequestsSent._id,
			existingUser._id
		);

		const updateReceivedFriendRequests = await this.friendRequestRepository.updateReceivedFriendRequests(
			friendRequestsReceived._id,
			user._id
		);

		if (updateSentFriendRequests.modifiedCount != 1 && updateReceivedFriendRequests.modifiedCount != 1)
			throw new badRequest("Failed to communicate the update, please try again");
		
		return true;
	}

}

export default new FriendRequestService;