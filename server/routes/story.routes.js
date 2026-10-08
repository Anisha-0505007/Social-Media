import express from "express";
import {isAuthenticated} from "../middlewares/authMiddleware.js";
import{createStory, getStoriesByUsername} from "../controllers/story.controller.js";

const storyRoutes = express.Router();

storyRoutes.post(
    "/createStory",
    isAuthenticated, upload.single("image"),
    createStory
);

storyRoutes.get(
    "/getStories",
    isAuthenticated,
    getStoriesByUsername
);

storyRoutes.delete(
    "/deleteStory/:id",
    isAuthenticated,
    deleteStory
);

export default storyRoutes;