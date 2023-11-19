import { body } from "express-validator";

export const createPostValidation = [
  body('title', 'Title is required').isString(),
  body('text', 'Text is required').isString(),
];
