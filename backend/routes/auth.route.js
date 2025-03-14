import express from "express";
import { signUp,logIn,logOut,test } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup',signUp)
router.post('/login',logIn)
router.post('/logout',logOut)

router.get('/test',test)

export default router