import express from "express";
import multer from "multer";
import { uploadToS3 } from "../controllers/post.controller.js";

const router = express.Router();

// Configure multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for videos
    },
    fileFilter: (req, file, cb) => {
        // Accept images and videos
        const allowedTypes = /\.(jpg|jpeg|png|gif|mp4|mov|avi|webm)$/i;
        if (!file.originalname.match(allowedTypes)) {
            return cb(new Error('Only image and video files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('file');

// Wrap the upload middleware to handle errors
router.post("/", (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.error('Multer error:', err);
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            // An unknown error occurred
            console.error('Unknown upload error:', err);
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        // Everything went fine
        next();
    });
}, uploadToS3);

export default router; 