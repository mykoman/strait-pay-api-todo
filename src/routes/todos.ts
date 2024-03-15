import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import asyncWrapper from "../middlewares/async-wrapper";

const router = Router();

router.post("/", asyncWrapper(createTodo));

router.get("/", asyncWrapper(getTodos));

router.patch("/:id", asyncWrapper(updateTodo));

router.delete("/:id", asyncWrapper(deleteTodo));

export default router;