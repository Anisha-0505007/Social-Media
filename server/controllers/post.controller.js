import express from "express";
import Post from "../controllers/post.controller.js";
import User from "../controllers/user.controller.js";
import uploadToCloudinary from "../middlewares/upload.middleware.js";

export const createPost = async (req,res) => {
    try{
      const {caption} = req.body;
              if (!caption?.trim() && !req.file) {
            return res.status(400).json({
                message: "Add a caption or upload an image"
            });
        }

        if (caption && caption.trim().length > 500) {
            return res.status(400).json({
                message: "Caption cannot exceed 500 characters"
            });
        }

        let image;

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file.buffer);
            image = uploadedImage.secure_url;
        }

        const post = await Post.create({
            author: req.user._id,
            caption: caption?.trim() || "",
            image
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { posts: post._id }
        });

        const populatedPost = await Post.findById(post._id)
            .populate("author", "name username profileImage");

        return res.status(201).json({
            message: "Post created successfully",
            post: populatedPost
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
}