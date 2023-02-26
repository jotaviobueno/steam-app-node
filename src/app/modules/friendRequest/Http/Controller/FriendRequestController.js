import FriendRequestService from "../Services/FriendRequestService.js";

class FriendRequestController {

	async sendFriendRequest(req, res) {
		const {user} = req;
		const {user_uuid} = req.headers;

		try {
    
			await FriendRequestService.sendFriendRequest(user, user_uuid);

			return res.status(204).json({success: ""});

		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async acceptFriendRequest(req, res) {
		const {friend_request_id} = req.headers;
		const {user} = req;

		try {
    
			await FriendRequestService.acceptFriendRequest(user, friend_request_id);

			return res.status(204).json({success: ""});

		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}
}

export default new FriendRequestController;