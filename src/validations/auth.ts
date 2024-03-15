import { body } from "express-validator";

export const validateRegistration = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];



  export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];

  export const validateCreateTodo = [
    body('text').notEmpty().withMessage('Text is requiredddd'),
  ];

  export const validateUpdateTodo = [
    body('text').notEmpty().withMessage('Text is required'),
    body('isCompleted').isBoolean().withMessage('Completed field should be true or false'),
  ];