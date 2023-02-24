import {Router} from "express";
import FriendRequestController from "../app/modules/friendRequest/Http/Controller/FriendRequestController.js";
import { handleSession } from "../app/Middlewares/session/HandleSession.js";
import { handleUser } from "../app/Middlewares/user/HandleUser.js";

export const friendRouter = Router();

friendRouter.post("/send", handleSession, handleUser, FriendRequestController.sendFriendRequest);
