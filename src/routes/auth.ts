import { Router } from "express";

import asyncWrapper from "../middlewares/async-wrapper";
import { register, login } from "../controllers/auth";
import { validateLogin, validateRegistration } from "../validations/auth";


const authRouter = Router();

authRouter.post("/register", validateRegistration, asyncWrapper(register));
authRouter.post("/login", validateLogin, asyncWrapper(login));

export default authRouter;
