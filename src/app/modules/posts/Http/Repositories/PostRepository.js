import PostModel from "../../../../Models/post/PostModel.js";

export class PostRepository {

	postModel;
	constructor() {
		this.postModel = PostModel;
	}

	async create(userID, createPostDto) {
		return await this.postModel.create({userID, ...createPostDto});
	}

	async findByPostId(postID) {
		return await this.postModel.findOne({postID, deletedAt: null});
	}

	async findPostAndOwners() {
		return await this.postModel.aggregate([
			{
				$match: {
					deletedAt: null
				}
			},
			{
				$lookup:
				{
					from: "users",
					localField: "userID",
					foreignField: "_id",
					as: "users"
				}
			},
			{
				$project: {
					_id: 0,
					postID: 1,
					title: 1,
					description: 1,
					owner: {
						$map: {
							input: "$users",
							as: "users",
							in: {
								username: "$$users.username",
							}
						}
					}
				}
			}
		]);
	}

	async findOnePostAndOwner(postID) {
		return await this.postModel.aggregate([
			{
				$match: {
					postID,
					deletedAt: null
				}
			},
			{
				$lookup:
				{
					from: "users",
					localField: "userID",
					foreignField: "_id",
					as: "users"
				}
			},
			{
				$project: {
					_id: 0,
					postID: 1,
					title: 1,
					description: 1,
					owner: {
						$map: {
							input: "$users",
							as: "users",
							in: {
								username: "$$users.username",
							}
						}
					}
				}
			}
		]);
	}

	async update(_id, updatePostDto) {
		return await this.postModel.updateOne({_id, deletedAt: null}, {
			...updatePostDto, updatedAt: new Date()
		});
	}

	async delete(_id) {
		return await this.postModel.updateOne({_id, deletedAt: null}, {
			deletedAt: new Date(), updatedAt: new Date()
		});
	}
}