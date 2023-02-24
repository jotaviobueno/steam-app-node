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
}

export default new FriendRequestController;