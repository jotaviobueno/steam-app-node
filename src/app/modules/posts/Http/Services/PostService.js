import {PostRepository} from "../Repositories/PostRepository.js";
import {notFound, unprocessableEntity, unauthorized, badRequest} from "../../../../common/Errors/HandleHttpErrors.js";
import PostTransformer from "../../Transformer/PostTransformer.js";
import {validateUpdatePostDto} from "../../Validators/ValidateUpdatePostDto.js";

class PostService {

	postRepository;
	constructor() {
		this.postRepository = new PostRepository();
	}

	async create(user, createPostDto) {
		const post = await this.postRepository.create(user._id, createPostDto);

		if (! post)
			throw new unprocessableEntity("Unable to update, please try again");

		return PostTransformer.postStored(post);
	}

	async findAll() {
		return await this.postRepository.findPostAndOwners();
	}

	async findOne(postID) {
		const post = await this.postRepository.findOnePostAndOwner(postID);

		if (post.length != 1) 
			throw new notFound("post not found");

		return post;
	}

	async update(user, postID, updatePostDto) {
		if (validateUpdatePostDto(updatePostDto))
			throw new badRequest("request empty");

		const post = await this.postRepository.findByPostId(postID);

		if (! post)
			throw new notFound("post not found");

		if (post.userID.toString() != user._id.toString())
			throw new unauthorized("not authorized");

		const update = await this.postRepository.update(post._id, updatePostDto);

		if (update.modifiedCount != 1)
			throw new unprocessableEntity("Unable to update, please try again");

		return true;
	}

	async delete(user, postID) {
		const post = await this.postRepository.findByPostId(postID);

		if (! post)
			throw new notFound("post not found");

		if (post.userID.toString() != user._id.toString())
			throw new unauthorized("not authorized");

		const deleted = await this.postRepository.delete(post._id);

		if (deleted.modifiedCount != 1)
			throw new unprocessableEntity("Unable to delete,");

		return true;
	}
}

export default new PostService;