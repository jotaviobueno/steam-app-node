import bcrypt from "bcrypt";
import {UserRepository} from "../Repositories/UserRepository.js";
import { SessionRepository } from "../../../sessions/Http/Repositories/SessionRepository.js";
import UserTransformer from "../../Transformer/UserTransformer.js";
import {badRequest, notFound, unprocessableEntity} from "../../../../common/Errors/HandleHttpErrors.js";
import {validateUpdateUserDto} from "../../Validators/ValidateUpdateUserDto.js";
import { FriendRequestRepository } from "../../../friendRequest/Http/Repositories/FriendRequestRepository.js";

class UserService {

	userRepository;
	friendRequestRepository;
	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
		this.friendRequestRepository = new FriendRequestRepository();
	}
  
	async create(createUserDto) {
		try {
			const user = await this.userRepository.create(createUserDto);

			await this.friendRequestRepository.create(user._id);

			return UserTransformer.userStored(user);
		} catch(e) {
			console.log(e);
			throw new unprocessableEntity("email or username already exist");
		}
	}

	async viewProfile(user) {
		let friendList = await this.friendRequestRepository.aggregateFriendRequests(user._id);
		let newUser = UserTransformer.viewProfile(user);

		return {...newUser, ...friendList[0]};
	}

	async findOne(username) {
		const user = await this.userRepository.findUserAndPosts(username);

		if (user.length != 1) throw new notFound("user not found");

		return user;
	}

	async update(user, session, updateUserDto) {
		
		if (validateUpdateUserDto(updateUserDto))
			throw new badRequest("request empty");

		if (updateUserDto.password) {

			if (await bcrypt.compare(updateUserDto.password, user.password))
				throw new badRequest("The provided password is the same as your account's");

			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
		}

		if (updateUserDto.username) {
			updateUserDto.username = updateUserDto.username.replace(/\s+/g, "");
		
			const checkUsernameAvailability = await this.userRepository.findByUsername(updateUserDto.username);

			if (checkUsernameAvailability)
				throw new badRequest("username already exist");
		}

		const update = await this.userRepository.update(user._id, updateUserDto);

		if (update.modifiedCount != 1)
			throw new unprocessableEntity("Unable to update, please try again");

		if (updateUserDto.password)
			await this.sessionRepository.addToBlackList(session.uuid);

		return true;
	}
}

export default new UserService;