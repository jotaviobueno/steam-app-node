import { badRequest, unprocessableEntity } from "../../../../common/Errors/HandleHttpErrors.js";
import { PhoneRepository } from "../Repositories/PhoneRepository.js";

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
}

export default new PhoneService;