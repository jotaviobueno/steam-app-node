import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const ReceivedFriendRequests = new Schema({
	sentBy: {type: Types.ObjectId, ref: "users"},
	friendRequestReceived: {type: Date, default: new Date()},
	status: {type: String, default: "received"}
});

const SentFriendRequests = new Schema({
	receivedBy: {type: Types.ObjectId, ref: "users"},
	friendRequestReceived: {type: Date, default: new Date()},
	status: {type: String, default: "sent"}
});

const Friend = new Schema({
	friendID: {type: Types.ObjectId, ref: "users"},
});

const FriendListSchema = new Schema({
	userID: {type: Types.ObjectId, ref: "users", required: true},
	receivedFriendRequests: [ReceivedFriendRequests],
	sentFriendRequests: [SentFriendRequests],
	friends: [Friend]
});


export default mongoose.model("friendList", FriendListSchema);