import { Router } from "express";
import { signIn, signUp } from "../controllers/User.controller.js";
const userRouter = Router();
userRouter.route("/library/signUp").post(signUp);
userRouter.route("/library/signIn").post(signIn);

export default userRouter;
