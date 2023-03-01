import { badRequest, unprocessableEntity } from "../../../../common/Errors/HandleHttpErrors.js";
import {WalletRepository} from "../Repositories/WalletRepository.js";

class WalletService {

	walletRepository;
	constructor() { 
		this.walletRepository = new WalletRepository();
	}

	async deposit(user, amount) {
		if (amount <= 0 || amount >= 50000)
			throw new badRequest("the amount for the deposit is too high or too low");

		const wallet = await this.walletRepository.findByUserId(user._id);

		const update = await this.walletRepository.updateValue(wallet._id, wallet.value + amount);

		if (update.modifiedCount !== 1)
			throw new unprocessableEntity("it was not possible to make the deposit");

		return true;
	}
}

export default new WalletService;