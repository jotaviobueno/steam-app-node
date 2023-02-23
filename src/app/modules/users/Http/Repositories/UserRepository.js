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
				$lookup:
				{
					from: "posts",
					localField: "_id",
					foreignField: "userID",
					as: "posts"
				}
			},
			{
				$project: {
					_id: 0,
					first_name: 1,
					last_name: 1,
					username:1,
					createdAt: 1,
					updatedAt: 1,
					posts: {
						$map: {
							input: "$posts",
							as: "posts",
							in: {
								postID: "$$posts.postID",
								title: "$$posts.title",
								description: "$$posts.description",
							}
						}
					}
				}
			}
		]);
	}

	async findByEmail(email) {
		return await this.userModel.findOne({"email.address": email, deletedAt: null});
	}

	async findById(_id) {
		return await this.userModel.findById(new Types.ObjectId(_id));
	}

	async update(userID, updateUserDto) {
		return await this.userModel.updateOne({_id: userID, deletedAt: null}, {
			...updateUserDto, updatedAt: new Date()
		});
	}
}