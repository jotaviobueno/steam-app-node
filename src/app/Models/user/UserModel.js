import mongoose, { Types } from "mongoose";
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;

const Phone = new Schema({
	dddi: {type: Number, minlength: 1, maxlength: 3},
	ddd: {type: Number, minlength: 1, maxlength: 2},
	number: {type: Number, minlength: 1, maxlength: 9},
	phoneVerifiedAt: {type: Date},
});

const Email = new Schema({
	address: {type: String, unique: true, required: true},
	emailVerifiedAt: {type: Date, default: null}
});

const Address = new Schema({
	street: {type: String},
	city: {type: String},
	neighborhood: {type: String},
	state: {type: String},
	house_number: {type: Number},
	zip: {type: Number},
});

const UserSchema = new Schema({
	uuid: {type: String, default: randomUUID},
	first_name: {type: String, required: true, minlength: 2, maxlength: 50},
	last_name: {type: String, required: true, minlength: 2, maxlength: 50},
	username: {type: String, required: true, unique: true, minlength: 3, maxlength: 20},
	avatar_url: {type: String, default: "https://i.imgur.com/oBPXx0D.png" },
	email: {type: Email},
	phones: {type: [Phone]},
	address: {type: [Address]},
	password: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	updatedAt: {type: Date, default: new Date()},
	deletedAt: {type: Date, default: null},
});


export default mongoose.model("user", UserSchema);