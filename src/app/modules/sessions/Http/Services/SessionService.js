import {randomUUID} from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { unauthorized } from "../../../../common/Errors/HandleHttpErrors.js";
import { UserRepository } from "../../../users/Http/Repositories/UserRepository.js";
import {config} from "../../../../../config/config.js";

class SessionService {

	userRepository;
	constructor() {
		this.userRepository = new UserRepository;
	}
	
	async create(createSessionDto) {
		const user = await this.userRepository.findByEmail(createSessionDto.email);

		if (! user)
			throw new unauthorized("invalid email or password");

		if (! await bcrypt.compare(createSessionDto.password, user.password))
			throw new unauthorized("invalid email or password");

		return jwt.sign({ id: user._id, uuid: randomUUID() }, config.jwt.secret, {
			expiresIn: "1d"
		});
	}
}

export default new SessionService;