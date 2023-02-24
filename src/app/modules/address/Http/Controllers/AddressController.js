import AddressService from "../Services/AddressService.js";

class AddressController {

	async create(req, res) {
		const {user} = req;
		const createAddressDto = {
			street: req.body.street,
			city: req.body.city,
			neighborhood: req.body.neighborhood,
			state: req.body.state,
			house_number: req.body.house_number, 
			zip: req.body.zip,
		};

		try {

			await AddressService.create(user, createAddressDto);

			return res.status(204).json({success: ""});

		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async update(req, res) {
		const {user} = req;
		const {id} = req.headers;
		const updateAddressDto = {
			street: req.body.street,
			city: req.body.city,
			neighborhood: req.body.neighborhood,
			state: req.body.state,
			house_number: req.body.house_number, 
			zip: req.body.zip,
		};

		try {

			await AddressService.update(user, id, updateAddressDto);

			return res.status(204).json({success: ""});

		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

	async delete(req, res) {
		const {user} = req;
		const {id} = req.headers;

		try {

			await AddressService.delete(user, id);

			return res.status(204).json({success: ""});

		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}
}

export default new AddressController;