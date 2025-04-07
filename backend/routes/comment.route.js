import express from "express";
import { getComments, createComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId/comments", getComments);
router.post("/:postId/comments", createComment);
router.delete("/comments/:commentId", deleteComment);

export default router; 