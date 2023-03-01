import {Router} from "express";

import UserController from "../app/modules/users/Http/Controllers/UserController.js";
import {handleSession} from "../app/Middlewares/session/HandleSession.js";
import {handleUser} from "../app/Middlewares/user/HandleUser.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", handleSession, handleUser, UserController.viewProfile);
userRouter.get("/:username", UserController.findOne);
userRouter.patch("/", handleSession, handleUser, UserController.update);