import Comment from "../models/Comment.js";
import mongoose from "mongoose";

export const getComments = async (req, res) => {
    const { postId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ success: false, message: "Invalid post ID format" });
    }

    try {
        const comments = await Comment.find({ postId })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content, userId, username } = req.body;

    if (!content || !userId || !username) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    try {
        const newComment = new Comment({
            content,
            postId,
            userId,
            username
        });

        await newComment.save();
        res.status(201).json({ success: true, data: newComment });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    try {
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}; 