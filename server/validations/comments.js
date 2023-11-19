import { body } from "express-validator";

export const createCommentValidation = [
  body('text', 'Text is required').isString(),
  body('postId', 'PostId is required').isString(),
];
