import jwt from "jsonwebtoken";
import {config} from "../../../config/config.js";
import { SessionRepository } from "../../modules/sessions/Http/Repositories/SessionRepository.js";
const sessionRepository = new SessionRepository();

export async function handleSession(req, res, next) {
	try {
		const [, access_token] = req.headers.authorization.split("Bearer ");

		const session = jwt.verify(access_token, config.jwt.secret);

		if (await sessionRepository.checkIfSessionIsInBblacklist(session.uuid))
			return res.status(400).json({error: "session invalid"});

		req.session = session;
		next();
    
	} catch(e) {
		return res.status(400).json({error: "session invalid"});
	}
}