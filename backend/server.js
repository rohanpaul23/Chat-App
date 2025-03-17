// express -> To initialise express server
// dotenv -> For environment variables
// cookie-parser -> To parse cookies
// bcryptjs -> To hash passwords
// mongoose -> For DB
// socket.io -> For real time communication
// jwt -> 
import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/messages.route.js"
import userRoutes from "./routes/user.route.js"
import connectToMongoDB from './db/connectToMongoDB.js';

import { app, server } from "./socket.js";



dotenv.config();




const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());


app.use("/", authRoutes);
app.use("/", messageRoutes);
app.use("/", userRoutes);


server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on ${PORT}`);
})
