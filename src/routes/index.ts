import { Router } from "express";
import todoRouter from "./todos";
import { verifyToken } from "../middlewares/auth";
import authRouter from "./auth";
const router = Router();

router.use("/auth", authRouter);
router.use("/todos", verifyToken, todoRouter);

export default router;
