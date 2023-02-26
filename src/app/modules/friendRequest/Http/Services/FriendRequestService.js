import {notFound, badRequest, unprocessableEntity} from "../../../../common/Errors/HandleHttpErrors.js";
import {UserRepository} from "../../../users/Http/Repositories/UserRepository.js";
import { FriendRequestRepository } from "../Repositories/FriendRequestRepository.js";
import {randomUUID} from "crypto";

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
		
		const id = randomUUID();

		const updateSentFriendRequests = await this.friendRequestRepository.updateSentFriendRequests(
			friendRequestsSent._id,
			existingUser._id,
			id
		);

		const updateReceivedFriendRequests = await this.friendRequestRepository.updateReceivedFriendRequests(
			friendRequestsReceived._id,
			user._id,
			id
		);

		if (updateSentFriendRequests.modifiedCount != 1 && updateReceivedFriendRequests.modifiedCount != 1)
			throw new badRequest("Failed to communicate the update, please try again");
		
		return true;
	}
	
	async acceptFriendRequest(user, friendRequestId) {
		const receivedFriendRequestsList = await this.friendRequestRepository.findByUserId(user.id);

		const receivedRequestIndex = receivedFriendRequestsList.receivedFriendRequests.findIndex(received => received.id === friendRequestId);
		if (receivedRequestIndex === -1)
			throw new notFound("Friend request not found");

		const friendRequestSender = await this.friendRequestRepository.findFrendRequestSent(friendRequestId);

		const sentRequestIndex = friendRequestSender.sentFriendRequests.findIndex(
			sent => sent.id === friendRequestId
		);

		receivedFriendRequestsList.receivedFriendRequests.splice(receivedRequestIndex, 1);
		friendRequestSender.sentFriendRequests.splice(sentRequestIndex, 1);

		receivedFriendRequestsList.friends.push({friendID: friendRequestSender.userID});
		friendRequestSender.friends.push({friendID: receivedFriendRequestsList.userID});

		const [updateRecipient, updateSender] = await Promise.all([
			this.friendRequestRepository.acceptFriendRequest(receivedFriendRequestsList._id, receivedFriendRequestsList),
			this.friendRequestRepository.acceptFriendRequest(friendRequestSender._id, friendRequestSender)
		]);

		if (updateRecipient.modifiedCount === 1 && updateSender.modifiedCount === 1) 
			return true;
		
		throw new unprocessableEntity("Failed to communicate the update, please try again");
	}
}

export default new FriendRequestService;