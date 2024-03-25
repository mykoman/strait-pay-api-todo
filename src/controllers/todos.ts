import ApplicationError from "../helpers/error-response";
import { SuccessResponse } from "../helpers/success-response";
import Todo from "../models/todos";
import { RESPONSE_CODES } from "../helpers/const";
import { AuthRequest, AuthRequestHandler } from "../types/auth";

/**
 * @description This creates a todo item
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const createTodo: AuthRequestHandler = async (req: AuthRequest, res) => {
  const { text } = req.body;
  const userId = req.user.id;
  const todo = await Todo.create({ text, userId });
  const response = new SuccessResponse({
    message: "Todo successfully created",
    data: todo,
  });
  return res.json(response);
};

/**
 * @description This lists the todo list in paginated manner using skip and limit queries, filters based on filter query
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const getTodos: AuthRequestHandler = async (req, res) => {
  const { skip = 0, limit = 10, isCompleted } = req.query;
  const userId = req.user.id;
  // Building filter based on query parameters
  const filter: { isCompleted?: boolean; userId: string } = { userId };
  if (isCompleted && (isCompleted === "1" || isCompleted === "0")) {
    filter.isCompleted = isCompleted === "1";
  }

  const queryBuilder = Todo.find(filter)
    .limit(Number(limit))
    .skip(Number(skip))
    .sort({ createdAt: -1 });

  const todos = await queryBuilder.exec();

  const totalCount = await Todo.countDocuments(filter);

  const response = new SuccessResponse({
    status: "success",
    message: "Todos successfully fetched",
    data: {
      todos,
      pagination: {
        totalItems: totalCount,
        currentPage: Math.floor(Number(skip) / Number(limit)) + 1,
        totalPages: Math.ceil(totalCount / Number(limit)),
        hasNextPage: Number(skip) + Number(limit) < totalCount,
        hasPrevPage: Number(skip) > 0,
      },
    },
  });

  return res.json(response);
};

/**
 * @description Updates a todo list item by Id
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const updateTodo: AuthRequestHandler = async (req, res) => {
  const { id } = req.params;
  const { isCompleted, text } = req.body;
  const userId = req.user.id;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { isCompleted, text, userId },
    { new: true }
  );
  if (!updatedTodo) {
    throw new ApplicationError(RESPONSE_CODES.NOT_FOUND, "Todo item not found");
  }

  const response = new SuccessResponse({
    message: "Todos successfully updated",
    data: updatedTodo,
  });
  return res.json(response);
};

/**
 * @description Delete a todo list item
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const deleteTodo: AuthRequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const todo = await Todo.findOne({ _id: id, userId });
  if (!todo) {
    throw new ApplicationError(RESPONSE_CODES.NOT_FOUND, "Todo item not found");
  }
  await Todo.findByIdAndDelete(id);
  const response = new SuccessResponse({
    message: "Todo successfully deleted",
  });
  return res.json(response);
};
