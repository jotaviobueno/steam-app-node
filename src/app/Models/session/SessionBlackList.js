import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SessionBlackListSchema = new Schema({
	uuid: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
});

export default mongoose.model("sessionBlackList", SessionBlackListSchema);