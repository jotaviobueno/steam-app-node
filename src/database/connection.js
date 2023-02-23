import mongoose from "mongoose";
import {config} from "../config/config.js";

export function connection() {
	try {
    
		mongoose.connect(config.database.mongoURI);

		console.log("Database connection established.");

	} catch(e) {
		console.log(e);
	}
}