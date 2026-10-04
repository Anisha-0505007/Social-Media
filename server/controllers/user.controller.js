// register controller 
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/generateToken.js";

const cookieOptions = {
    httponly: true
} 

export const registerUser = async(req,res)=>{
    try{
        const {name , email , username , password} = req.body;

        if(!name || !email || !username || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        } 

        const userExists = await User.findOne({username}); // check if user already exists

        if (userExists){
            return res.status(400).json({message:"Username already exists"});
        }

        const emailExists = await User.findOne({email}); // check if email already exists

        if (emailExists){
            return res.status(400).json({message:"Email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, username, email, password : hashedPassword 
        })
        const token = genToken(newUser._id);
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            message:"User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
            }
        });
        console.log("User registered successfully");
        
       



    }catch(error){
         res.status(500).json({message:"Server error", error:error.message});
    }
} 

export const loginUser = async(req,res)=>{
    try{
       const {email , password} = req.body;

       if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
       }
       const user = await User.findOne({email});
       if(!user){
        return res.status(404).json({message:"User not found"});
       }

       const passwordMatched = await bcrypt.compare(password, user.password);
       if(!passwordMatched){
        return res.status(401).json({message:"Invalid credentials"});
       }
       console.log("User logged in successfully");
       res.status(200).json({message: 'User logged in'}) 

    } catch(error){
        res.status(500).json({message:"Server error", error:error.message});
    }

    

}

export const getMe = async(req,res)=>{
    try{
        const user = req.user; // get user details from request object
        res.status(200).json({
            message:"User details",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({message:"Server error", error:error.message});
    }   
}