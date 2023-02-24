import {Router} from "express";
import AddressController from "../app/modules/address/Http/Controllers/AddressController.js";
import { handleSession } from "../app/Middlewares/session/HandleSession.js";
import { handleUser } from "../app/Middlewares/user/HandleUser.js";

export const addressRouter = Router();

addressRouter.post("/", handleSession, handleUser, AddressController.create);
addressRouter.patch("/", handleSession, handleUser, AddressController.update);
addressRouter.delete("/", handleSession, handleUser, AddressController.delete);
