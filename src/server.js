import "dotenv/config";
import express from "express";
import {connection} from "./database/connection.js";
import {config} from "./config/config.js";
import {application} from "./app/application.js";

function bootstrap() {
	const server = express();
	const port = config.server.port;

	connection();
	application(server, express);

	server.listen(port, () => {
		console.log(`Server listening on port: ${port}`);
	});
}

bootstrap();