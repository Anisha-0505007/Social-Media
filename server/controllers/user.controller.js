// register controller 
import User from "../models/user.model.js";

const registerUser = async(req,res)=>{
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

        const newUser = User.create({
            name, username, email, password
        })

        res.status(201).json({message:"User registered successfully", user:newUser});



    }catch(error){
         res.status(500).json({message:"Server error", error:error.message});
    }

    

}