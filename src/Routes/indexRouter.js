import {Router} from "express";
import {userRoutes} from "./userRoutes.js";
import {sessionRoutes} from "./sessionRoutes.js";
import {postRouter} from "./postRouter.js";
import {addressRouter} from "./addressRouter.js";
import { phoneRouter } from "./phoneRouter.js";

export const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/session", sessionRoutes);
indexRouter.use("/post", postRouter);
indexRouter.use("/address", addressRouter);
indexRouter.use("/phones", phoneRouter);