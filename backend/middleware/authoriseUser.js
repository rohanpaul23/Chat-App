import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const authoriseUser = async(req,res,next) => {
    try{
        const token = req.cookies.jwt;
        console.log("token",token)

        if(!token){
           return res.status(401).json({error : "Unauthorized - No token provided"})
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

		req.user = user;
		next();
    }
    catch(e){
        console.log("Error while authorising user ", e.message);
		res.status(500).json({ error: "Error while authorising user" });
    }
}

export default authoriseUser