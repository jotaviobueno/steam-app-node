import UserService from "../Services/UserService.js";

class UserController {

	async create(req, res) {
		const createUserDto = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		};

		try {
			const data = await UserService.create(createUserDto);

			return res.status(201).json({data});
		} catch (e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async viewProfile(req, res) {
		const {user} = req;

		const data = await UserService.viewProfile(user);

		return res.status(200).json({data});
	}

	async findOne(req, res) {
		const username = req.params.username.replace(/\s+/g, "");

		try {
			const data = await UserService.findOne(username);

			return res.status(200).json({data});
		} catch (e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async update(req, res) {
		const {user, session} = req;
		const updateUserDto = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			password: req.body.password,
		};

		try {

			await UserService.update(user, session, updateUserDto);

			return res.status(204).json({});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}
}

export default new UserController;