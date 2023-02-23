import { badRequest, notFound, unprocessableEntity } from "../../../../common/Errors/HandleHttpErrors.js";
import { AddressRepository } from "../Repositories/AddressRepository.js";

class AddressService {

	addressRepository;
	constructor() {
		this.addressRepository = new AddressRepository();
	}

	async create(user, createAddressDto) {
  
		if (user.address.length >= 5)
			throw new badRequest("address limit reached");

		const address = await this.addressRepository.create(user, createAddressDto);

		if (address.modifiedCount != 1)
			throw new unprocessableEntity("unable to add address, please try again");
    
		return true;
	}

	async delete(user, id) {
		const addressIndex = user.address.findIndex(addr => addr._id.toString() === id);

		if (addressIndex === -1)
			throw new notFound("address not found");

		const deleted = await this.addressRepository.remove(user._id, id);

		if (deleted.modifiedCount != 1)
			throw new unprocessableEntity("Unable to remove address, please try again");

		return true;
	}
}

export default new AddressService;