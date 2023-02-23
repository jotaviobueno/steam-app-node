import {Router} from "express";
import SessionController from "../app/modules/sessions/Http/Controllers/SessionController.js";

export const sessionRoutes = Router();

sessionRoutes.post("/", SessionController.create);