import express from "express";

import { createPost, deletePost, getPost, updatePost, likePost, getPostsByUserId, getPostById } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPost);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostsByUserId);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);

export default router;