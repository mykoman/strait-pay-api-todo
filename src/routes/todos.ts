import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import asyncWrapper from "../middlewares/async-wrapper";
import { validateCreateTodo, validateUpdateTodo } from "../validations/todo";

const router = Router();

router.post("/", validateCreateTodo, asyncWrapper(createTodo));

router.get("/", asyncWrapper(getTodos));

router.patch("/:id", validateUpdateTodo, asyncWrapper(updateTodo));

router.delete("/:id", asyncWrapper(deleteTodo));

export default router;