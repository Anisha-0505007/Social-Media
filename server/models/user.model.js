import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    },
    followers: [],
    following: [],
    bio :{
        type:String,
    },

    post : [],
    stories : [],
    reels : [],

    isVerified :{
        type:Boolean,
        default:false,
        required:true
    }




})

const User = mongoose.model('User',userSchema);

export default User; 