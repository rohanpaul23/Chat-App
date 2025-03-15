import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import authoriseUser from "../middleware/authoriseUser.js";

const router = express.Router();

router.get("/getmessage/:id", authoriseUser, getMessages);
router.post("/send/:id", authoriseUser, sendMessage);

export default router;