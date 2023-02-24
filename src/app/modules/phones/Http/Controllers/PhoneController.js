import PhoneService from "../Services/PhoneService.js";

class PhoneController {

	async create(req, res) {
		const {user} = req;
		const createPhoneDto = {
			dddi: req.body.dddi,
			ddd: req.body.ddd,
			number: req.body.number,
		};

		try {

			await PhoneService.create(user, createPhoneDto);

			return res.status(204).json({success: ""});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async update(req, res) {
		const {user} = req;
		const {id} = req.headers;
		const updatePhoneDto = {
			dddi: req.body.dddi,
			ddd: req.body.ddd,
			number: req.body.number,
		};

		try {

			await PhoneService.update(user, id, updatePhoneDto);

			return res.status(204).json({success: ""});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async delete(req, res) {
		const {user} = req;
		const {id} = req.headers;

		try {

			await PhoneService.delete(user, id);

			return res.status(204).json({success: ""});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}

	}
}

export default new PhoneController;