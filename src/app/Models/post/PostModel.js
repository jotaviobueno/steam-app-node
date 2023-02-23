import mongoose, {Types} from "mongoose";
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	userID: { type: Types.ObjectId, required: true, ref: "users" },
	postID: {type: String, default: randomUUID},
	title: {type: String, required: true},
	description: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	updatedAt: {type: Date, default: new Date()},
	deletedAt: {type: Date, default: null},
});

export default mongoose.model("post", PostSchema);