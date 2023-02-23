class Exception {
	constructor(message, code) {
		let error = new Error(message);
		error.code = code;
		
		throw error;
	}
}

export default Exception;