import { Types } from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../../../../Models/user/UserModel.js";

export class UserRepository {
	
	userModel;
	constructor() {
		this.userModel = UserModel;
	}

	async create(createUserDto) {
		return await this.userModel.create({
			...createUserDto, 
			username: createUserDto.username.replace(" ", ""),
			email: {
				address: createUserDto.email,
			},
			password: await bcrypt.hash(createUserDto.password, 10)
		});
	}

	async findByUsername(username) {
		return await this.userModel.findOne({username, deletedAt: null});
	}

	async findUserAndPosts(username) {
		return await this.userModel.aggregate([
			{
				$match: {
					username,
				}
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "userID",
					as: "posts"
				}
			},
			{
				$lookup: {
					from: "friendlists",
					localField: "_id",
					foreignField: "userID",
					as: "friendlists"
				}
			},
			{
				$project: {
					_id: 0,
					__v: 0,
					email: 0,
					phones: 0,
					address: 0,
					password: 0,
					deletedAt: 0,
					updatedAt: 0,

					"posts._id": 0,
					"posts.userID": 0,
					"posts.description": 0,
					"posts.updatedAt": 0,
					"posts.deletedAt": 0,
					"posts.__v": 0,

					"friendlists.userID": 0,
					"friendlists.receivedFriendRequests": 0,
					"friendlists.sentFriendRequests": 0,
					"friendlists.__v": 0,
				}
			},
		]);
	}

	async findByEmail(email) {
		return await this.userModel.findOne({"email.address": email, deletedAt: null});
	}

	async findById(_id) {
		return await this.userModel.findById(new Types.ObjectId(_id));
	}

	async findByUuid(uuid) {
		return await this.userModel.findOne({uuid, deletedAt: null});
	}

	async update(userID, updateUserDto) {
		return await this.userModel.updateOne({_id: userID, deletedAt: null}, {
			...updateUserDto, updatedAt: new Date()
		});
	}
}