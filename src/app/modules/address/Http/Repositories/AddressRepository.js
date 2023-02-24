import UserModel from "../../../../Models/user/UserModel.js";

export class AddressRepository {

	userModel;
	constructor() {
		this.userModel = UserModel;
	}

	async create(_id, createAddressDto) {
		return await this.userModel.updateOne({_id, deletedAt: null}, {$push: {address: {...createAddressDto}}});
	}

	async update(userID, _id, updatePhoneDto) {
		const updateFields = {};
		if (updatePhoneDto.street) updateFields["address.$[elem].street"] = updatePhoneDto.street;
		if (updatePhoneDto.city) updateFields["address.$[elem].city"] = updatePhoneDto.city;
		if (updatePhoneDto.neighborhood) updateFields["address.$[elem].neighborhood"] = updatePhoneDto.neighborhood;
		if (updatePhoneDto.state) updateFields["address.$[elem].state"] = updatePhoneDto.state;
		if (updatePhoneDto.house_number) updateFields["address.$[elem].house_number"] = updatePhoneDto.house_number;
		if (updatePhoneDto.zip) updateFields["address.$[elem].zip"] = updatePhoneDto.zip;

		return await this.userModel.updateOne(
			{ _id: userID },
			{ $set: updateFields },
			{ arrayFilters: [{ "elem._id": _id }] },
		);
	}

	async remove(userID, _id) {
		return await this.userModel.updateOne({_id: userID}, { $pull: { address: { _id, } } },
			{ arrayFilters: [ { "address._id": _id } ] }
		);
	}
}