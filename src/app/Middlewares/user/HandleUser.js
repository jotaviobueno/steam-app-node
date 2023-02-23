import {UserRepository} from "../../modules/users/Http/Repositories/UserRepository.js";

const userRepository = new UserRepository();

export async function handleUser(req, res, next) {
	const {session} = req;

	const user = await userRepository.findById(session.id);

	if (! user)
		return res.status(422).json({error: "invalid user"});

	req.user = user;
	next();
}