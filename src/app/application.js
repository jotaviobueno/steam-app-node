import {indexRouter} from "../Routes/indexRouter.js";

export function application (app, express) {
	app.use(express());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({limit: "50mb"}));
	app.use(indexRouter);
}