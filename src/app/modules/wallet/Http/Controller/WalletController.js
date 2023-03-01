import WalletService from "../Services/WalletService.js";

class WalletController {
  
	async deposit(req, res) {
		const {user} = req;
		const {amount} = req.body;

		try {

			await WalletService.deposit(user, amount);

			return res.status(200).json({data: "deposit made successfully"});
		} catch(e) {
			return res.status(e.code).json({error: e.message});
		}
	}

}

export default new WalletController;