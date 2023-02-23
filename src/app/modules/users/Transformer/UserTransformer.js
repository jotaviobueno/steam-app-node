class UserTransformer {
	userStored(user) {
		return {
			uuid: user.uuid, 
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: {
				address: user.email.address,
				emailVerifiedAt: user.email.emailVerifiedAt,
			},
			createdAt: user.createdAt,
		};
	}

	viewProfile(user) {
		return {
			uuid: user.uuid,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: {
				address: user.email.address,
				emailVerifiedAt: user.email.emailVerifiedAt,
			},
			phones: user.phones,
			address: user.address,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	outherProfile(user) {
		return {
			uuid: user.uuid, 
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			createdAt: user.createdAt,
		};
	}
}

export default new UserTransformer;