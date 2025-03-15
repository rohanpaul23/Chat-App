import express from "express";
import authoriseUser from "../middleware/authoriseUser.js";
import { getUsersToChatwith } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", authoriseUser, getUsersToChatwith);

export default router;