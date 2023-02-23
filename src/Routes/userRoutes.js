import {Router} from "express";

import UserController from "../app/modules/users/Http/Controllers/UserController.js";
import {handleSession} from "../app/Middlewares/session/HandleSession.js";
import {handleUser} from "../app/Middlewares/user/HandleUser.js";

export const userRoutes = Router();

userRoutes.post("/", UserController.create);
userRoutes.get("/", handleSession, handleUser, UserController.viewProfile);
userRoutes.get("/:username", UserController.findOne);
userRoutes.patch("/", handleSession, handleUser, UserController.update);