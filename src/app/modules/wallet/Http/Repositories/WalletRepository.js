import WalletModel from "../../../../Models/wallet/WalletModel.js";  

export class WalletRepository {

	walletModel;
	constructor() {
		this.walletModel = WalletModel; 
	}

	async create(userID) {
		return await this.walletModel.create({
			ownerID: userID,
		});
	}

	async findByUserId(userID) {
		return await this.walletModel.findOne({ownerID: userID});
	}

	async updateValue(_id, value) { 
		return await this.walletModel.updateOne({ _id }, {value, updatedAt: new Date()});
	}
}
