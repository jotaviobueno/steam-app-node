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

	async remove(userID, _id) {
		return await this.userModel.updateOne({_id: userID}, { $pull: { phones: { _id, } } },
			{ arrayFilters: [ { "phones._id": _id } ] }
		);
	}
}