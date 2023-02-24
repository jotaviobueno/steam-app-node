import { badRequest, notFound, unprocessableEntity } from "../../../../common/Errors/HandleHttpErrors.js";
import { PhoneRepository } from "../Repositories/PhoneRepository.js";
import {validateUpdatePhoneDto} from "../../Validators/ValidateUpdatePhoneDto.js";

class PhoneService {

	phoneRepository;
	constructor() {
		this.phoneRepository = new PhoneRepository();
	}

	async create(user, createPhoneDto) {
		if (user.phones.length >= 2)
			throw new badRequest("you have reached the maximum number of phones allowed on your account.");

		const exist = await this.phoneRepository.checkPhoneNumberExists(createPhoneDto.number);

		if (exist)
			throw new unprocessableEntity("phone alreay exist");

		const phone = await this.phoneRepository.create(user._id, createPhoneDto);

		if (phone.modifiedCount != 1)
			throw new unprocessableEntity("unable to add your phone, please try again");

		return true;
	}

	async update(user, id, updatePhoneDto) {
		if (validateUpdatePhoneDto(updatePhoneDto))
			throw new badRequest("request empty");

		const phonesIndex = user.phones.findIndex(phones => phones._id.toString() === id);

		if (phonesIndex === -1)
			throw new notFound("phone not found");

		if (updatePhoneDto.number && await this.phoneRepository.checkPhoneNumberExists(updatePhoneDto.number))
			throw new unprocessableEntity("phone already exist");
		
		const update = await this.phoneRepository.update(user._id, id, updatePhoneDto);

		if (update.modifiedCount != 1)
			throw new unprocessableEntity("unable to , please try again");

		return true;
	}

	async delete(user, id) {	
		const phonesIndex = user.phones.findIndex(phones => phones._id.toString() === id);

		if (phonesIndex === -1)
			throw new notFound("phone not found");

		const deleted = await this.phoneRepository.remove(user._id, id);

		if (deleted.modifiedCount != 1)
			throw new unprocessableEntity("Unable to remove phones, please try again");
	
		return true;
	}
}

export default new PhoneService;