import {Router} from "express";
import PhoneController from "../app/modules/phones/Http/Controllers/PhoneController.js";
import { handleSession } from "../app/Middlewares/session/HandleSession.js";
import { handleUser } from "../app/Middlewares/user/HandleUser.js";

export const phoneRouter = Router();

phoneRouter.post("/", handleSession, handleUser, PhoneController.create);