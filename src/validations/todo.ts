import { body } from "express-validator";

export const validateCreateTodo = [
    body('text').notEmpty().withMessage('Text is required'),
  ];

  export const validateUpdateTodo = [
    body('text').notEmpty().withMessage('Text is required'),
    body('isCompleted').isBoolean().withMessage('Completed field should be true or false'),
  ];