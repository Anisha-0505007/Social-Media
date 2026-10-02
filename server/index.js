// setup database , connect routes , and start server
//  "type": "module",  this is important to use import and export in nodejs

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT =  8001;

app.use(express.json()); // to parse json data from request body

// connect to database
mongoose.connect(process.env.dbUrl).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log('Error connecting to database', err);
});

app.use('/users', userRoutes);

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})