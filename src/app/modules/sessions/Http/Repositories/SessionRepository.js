import SessionBlackListModel from "../../../../Models/session/SessionBlackList.js";

export class SessionRepository {

	sessionBlackListModel;
	constructor() {
		this.sessionBlackListModel = SessionBlackListModel;
	}

	async addToBlackList(uuid) {
		return await this.sessionBlackListModel.create({uuid});
	}

	async checkIfSessionIsInBblacklist(uuid) {
		return await this.sessionBlackListModel.findOne({uuid});
	}

}