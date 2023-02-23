import UserModel from "../../../../Models/user/UserModel.js";

export class AddressRepository {

	userModel;
	constructor() {
		this.userModel = UserModel;
	}

	async create(_id, createAddressDto) {
		return await this.userModel.updateOne({_id, deletedAt: null}, {$push: {address: {...createAddressDto}}});
	}

	async remove(userID, _id) {
		return await this.userModel.updateOne({_id: userID}, { $pull: { address: { _id, } } },
			{ arrayFilters: [ { "address._id": _id } ] }
		);
	}
}