import express from "express";
import {isAuthenticated} from "../middlewares/auth.middleware.js";

const postRoutes = express.Router()
postRoutes.post('/createPost', isAuthenticated, upload.single('image'), createPost);
