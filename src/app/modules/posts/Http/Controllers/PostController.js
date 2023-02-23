import PostService from "../Services/PostService.js";

class PostController {

	async create(req, res) {
		const {user} = req;
		const createPostDto = {
			title: req.body.title,
			description: req.body.description,
		};

		try {

			const data = await PostService.create(user, createPostDto);

			return res.status(201).json({data});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async findAll(req, res) {
		const data = await PostService.findAll();

		return res.status(200).json({data});
	}

	async findOne(req, res) {
		const postID = req.params.post_id;

		try {

			const data = await PostService.findOne(postID);

			return res.status(200).json({data});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async update(req, res) {
		const {user} = req;
		const postID = req.params.post_id;
		const updatePostDto = {
			title: req.body.title,
			description: req.body.description,
		};

		try {

			const data = await PostService.update(user, postID, updatePostDto);

			return res.status(204).json({data});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async delete(req, res) {
		const {user} = req;
		const postID = req.params.post_id;

		try {

			const data = await PostService.delete(user, postID);

			return res.status(204).json({data});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}
}

export default new PostController;