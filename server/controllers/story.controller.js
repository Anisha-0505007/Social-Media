import express from "express";
import Story from "../controllers/story.controller.js";
import User from "../controllers/user.controller.js";
import uploadToCloudinary from "../middlewares/upload.middleware.js";

const Story_lifetime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const createStory = async (req, res) => {
    try {
      const {caption} = req.body;
              if (!caption?.trim() && !req.file) {
            return res.status(400).json({
                message: "Add a caption or upload an image"
            });
        }

        if (caption && caption.trim().length > 300) {
            return res.status(400).json({
                message: "Caption cannot exceed 300 characters"
            });
        }

        let image;

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file.buffer);
            image = uploadedImage.secure_url;
        }

        const story = await Story.create({
            author: req.user._id,
            caption: caption?.trim() || "",
            image,
            expiresAt: new Date(Date.now() + Story_lifetime) // Set expiration time
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { stories: story._id }
        });

        const populatedStory = await Story.findById(story._id)
            .populate("author", "name username profileImage");

        return res.status(201).json({
            message: "Story created successfully",
            story: populatedStory
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating story", error });
    }
}

export const getStoriesByUsername = async (req, res) => {
    try{
       let allowedUsers = [req.user._id, ...req.user.following] || [];
       const stories = await Story.find({
        author: {$in: allowedUsers},
        expiresAt: {$gt: new Date()} // Only fetch stories that haven't expired
       }).sort({ createdAt: -1 }).populate("author", "username profileImage");

       res.status(200).json({ message: "Stories fetched successfully", stories });
    } catch(error){
       return res.status(500).json({ message: "Error fetching stories", error });
    }
}