import UserModel from "../../../../Models/user/UserModel.js";

export class PhoneRepository {

	userModel;
	constructor() {
		this.userModel = UserModel;
	}

	async create(_id, createPhoneDto) {
		return await this.userModel.updateOne({_id, deletedAt: null}, {$push: {phones: {...createPhoneDto}}});
	}

	async checkPhoneNumberExists(phone) {
		return await this.userModel.findOne({"phones.number": phone});
	}

	async update(userID, _id, updatePhoneDto) {
		const updateFields = {};
		if (updatePhoneDto.number) updateFields["phones.$[elem].number"] = updatePhoneDto.number;
		if (updatePhoneDto.ddi) updateFields["phones.$[elem].ddi"] = updatePhoneDto.ddi;
		if (updatePhoneDto.ddd) updateFields["phones.$[elem].ddd"] = updatePhoneDto.ddd;

		return await this.userModel.updateOne(
			{ _id: userID },
			{ $set: updateFields },
			{ arrayFilters: [{ "elem._id": _id }] },
		);
	}

	async remove(userID, _id) {
		return await this.userModel.updateOne({_id: userID}, { $pull: { phones: { _id, } } },
			{ arrayFilters: [ { "phones._id": _id } ] }
		);
	}
}