import express from "express";
import { PostController } from "../controllers/index.js";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.post("/like/:id", PostController.likePost);
router.post("/dislike/:id", PostController.dislikePost);
router.post("/", PostController.create);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.remove);

export default router;

