import {Router} from "express";
import PostController from "../app/modules/posts/Http/Controllers/PostController.js";
import { handleSession } from "../app/Middlewares/session/HandleSession.js";
import { handleUser } from "../app/Middlewares/user/HandleUser.js";

export const postRouter = Router();

postRouter.post("/", handleSession, handleUser, PostController.create);
postRouter.get("/", handleSession, handleUser, PostController.findAll);
postRouter.get("/:post_id", handleSession, handleUser, PostController.findOne);
postRouter.patch("/:post_id", handleSession, handleUser, PostController.update);
postRouter.delete("/:post_id", handleSession, handleUser, PostController.delete);