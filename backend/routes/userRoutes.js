import express from "express";
import { getUsersForSideBar } from "../controllers/userControllers.js"
import { authenticateToken } from "../middleware/authentication.js";

const router = express.Router();
router.get("/", authenticateToken, getUsersForSideBar);

export default router;