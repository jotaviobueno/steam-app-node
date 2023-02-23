import SessionService from "../Services/SessionService.js";

class SessionController {

	async create(req, res) {
		const createSessionDto = {
			email: req.body.email,
			password: req.body.password,
		};

		try {
			const data = await SessionService.create(createSessionDto);

			return res.status(200).json({data});
		} catch (e) {
			return res.status(e.code).json({error: e.message});
		}
	}
}

export default new SessionController;