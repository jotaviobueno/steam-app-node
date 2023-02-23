class PostTransformer {
	postStored(postStored) {
		return {
			postID: postStored.postID,
			title: postStored.title,
			description: postStored.description,
			createdAt: postStored.createdAt,
			updatedAt: postStored.updatedAt,
		};
	}
}

export default new PostTransformer;