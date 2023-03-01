import {Router} from "express";
import {userRouter} from "./userRoutes.js";
import {sessionRoutes} from "./sessionRoutes.js";
import {postRouter} from "./postRouter.js";
import {addressRouter} from "./addressRouter.js";
import { phoneRouter } from "./phoneRouter.js";
import {friendRouter} from "./friendRouter.js";
import {walletRouter} from "../Routes/walletRouter.js";

export const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/session", sessionRoutes);
indexRouter.use("/post", postRouter);
indexRouter.use("/address", addressRouter);
indexRouter.use("/phones", phoneRouter);
indexRouter.use("/friend", friendRouter);
indexRouter.use("/wallet", walletRouter);