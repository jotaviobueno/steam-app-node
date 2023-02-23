import Exception from "../Exceptions/Exceptions.js";

export function badRequest(message) {
	handle(message, 400);
}

export function unauthorized(message) {
	handle(message, 401);
}

export function forbidden(message) {
	handle(message, 403);
}

export function notFound(message) {
	handle(message, 404);
}

export function notAcceptable(message) {
	handle(message, 406);
}

export function conflict(message) {
	handle(message, 409);
}

export function unprocessableEntity(message) {
	handle(message, 422);
}

export function internalServerError(message) {
	handle(message, 500);
}

function handle(message, code) {
	throw new Exception(message + ".", code);
}