import express from "express";
import { CommentController } from "../controllers/index.js";

const router = express.Router();

router.post("/", CommentController.create);
router.get("/:postId", CommentController.getByPostId);

export default router;

