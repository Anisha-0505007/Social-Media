import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 
export const isAuthenticated = async (req,res,next)=>{
     
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.jwt_secret);  
        
        const user = await User.findById(decoded.userId).select("-password"); // get user details without password
        req.user = user; // attach user details to request object
        next(); // call next middleware

    } catch(error){
        res.status(401).json({message:"Not authorized", error:error.message});
    }
}