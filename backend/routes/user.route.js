import express from "express";

import { createUser, deleteUser, updateUser, getUser, login, getLeaderboard, getUserByUsername } from "../controllers/user.controller.js";

const router = express.Router();

// Specific routes first
router.get("/leaderboard", getLeaderboard);
router.get("/profile/:username", getUserByUsername);
router.post("/login", login);
router.post("/", createUser);

// Parameterized routes last
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get('/:id', getUser);

export default router;