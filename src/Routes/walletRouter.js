import {Router} from "express";

import WalletController from "../app/modules/wallet/Http/Controller/WalletController.js";
import {handleSession} from "../app/Middlewares/session/HandleSession.js";
import {handleUser} from "../app/Middlewares/user/HandleUser.js";

export const walletRouter = Router();

walletRouter.post("/deposit", handleSession, handleUser, WalletController.deposit);