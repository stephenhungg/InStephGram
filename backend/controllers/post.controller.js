import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export const uploadToS3 = async (req, res) => {
    try {
        console.log('Starting file upload to S3...');
        
        if (!req.file) {
            console.log('No file received');
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Validate file size (5MB limit)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
        if (req.file.size > MAX_FILE_SIZE) {
            return res.status(400).json({ 
                success: false, 
                message: "File size exceeds 5MB limit" 
            });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid file type. Only JPEG, PNG, and GIF are allowed" 
            });
        }

        console.log('File details:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        // Verify AWS credentials and bucket name
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.S3_BUCKET_NAME) {
            console.error('Missing AWS credentials or bucket name');
            return res.status(500).json({ 
                success: false, 
                message: "Server configuration error" 
            });
        }

        const sanitizedFileName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        const key = `${Date.now()}_${sanitizedFileName}`;

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        console.log('Attempting S3 upload with params:', {
            Bucket: params.Bucket,
            Key: params.Key,
            ContentType: params.ContentType
        });

        const uploadResult = await s3.upload(params).promise();
        console.log('S3 upload successful:', uploadResult);
        
        res.status(200).json({ 
            success: true, 
            imageUrl: uploadResult.Location,
            key: uploadResult.Key
        });
    } catch (error) {
        console.error('Error in uploadToS3:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            requestId: error.requestId,
            stack: error.stack
        });
        
        // Send appropriate error message based on error type
        if (error.code === 'NoSuchBucket') {
            return res.status(500).json({ 
                success: false, 
                message: "S3 bucket not found" 
            });
        } else if (error.code === 'AccessDenied') {
            return res.status(500).json({ 
                success: false, 
                message: "Access denied to S3 bucket" 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: "Error uploading file: " + error.message
        });
    }
};

// Function to upload image to S3
const uploadImageToS3 = async (file) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error("Error uploading to S3:", err);
                reject(err);
            } else {
                console.log("Successfully uploaded to S3:", data.Location);
                resolve(data.Location);
            }
        });
    });
};

export const getPost = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.log("Error in fetching posts: ", error.message);
        // If database is not connected, return empty array
        if (error.name === 'MongooseError' || error.message.includes('connection')) {
            res.status(200).json({ success: true, data: [] });
        } else {
            res.status(500).json({ success: false, message: "Server Error"});
        }
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    console.log("Received post data:", post);
    if (!post.caption || !post.title || !post.author || !post.userId || !post.image) {
        console.log("Missing fields:", {
            caption: !post.caption,
            title: !post.title,
            author: !post.author,
            userId: !post.userId,
            image: !post.image
        });
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        // Validate userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(post.userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        // Create the post with the image URL from the request
        const newPost = new Post({
            title: post.title,
            caption: post.caption,
            author: post.author,
            userId: new mongoose.Types.ObjectId(post.userId),
            image: post.image,
            likes: [],
            likesCount: 0
        });
        
        console.log("Attempting to save post:", newPost);
        await newPost.save();
        console.log("Post saved successfully");

        // Find and update the user
        console.log("Finding user with ID:", post.userId);
        const user = await User.findById(post.userId);
        if (!user) {
            console.log("User not found with ID:", post.userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Updating user posts array");
        user.posts = user.posts || [];
        user.posts.push(newPost._id);
        await user.save();
        console.log("User updated successfully");

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error in Create Post:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        if (error.name === 'ValidationError') {
            console.error("Validation Errors:", Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message,
                value: error.errors[key].value
            })));
            return res.status(400).json({ 
                success: false, 
                message: "Validation Error", 
                errors: error.errors 
            });
        }
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Post ID" });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json({success: true, data: updatedPost});
    } catch(error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    const userId = req.query.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid post ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        // Find the post first to verify ownership
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Verify post ownership
        if (post.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this post" });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        // Remove post reference from user's posts array
        await User.findByIdAndUpdate(userId, {
            $pull: { posts: id }
        });

        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deletePost:", error);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    console.log('Like request received:', { postId: id, userId });

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Post ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Invalid User ID" });
    }

    try {
        // Find post and initialize likes array if it doesn't exist
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Initialize likes array if undefined
        if (!post.likes) {
            post.likes = [];
        }

        console.log('Found post:', { 
            postId: post._id,
            currentLikes: post.likes,
            currentLikesCount: post.likesCount 
        });

        // Find the post author
        const postAuthor = await User.findById(post.userId);
        if (!postAuthor) {
            return res.status(404).json({ success: false, message: "Post author not found" });
        }

        // Initialize totalLikesReceived if undefined
        if (typeof postAuthor.totalLikesReceived !== 'number') {
            postAuthor.totalLikesReceived = 0;
        }

        console.log('Found author:', { 
            userId: postAuthor._id,
            currentTotalLikes: postAuthor.totalLikesReceived 
        });

        // Check if user has already liked the post
        const userIdObj = new mongoose.Types.ObjectId(userId);
        const isLiked = post.likes.some(id => id.equals(userIdObj));
        console.log('Like status:', { isLiked });
        
        if (isLiked) {
            // Remove like
            post.likes = post.likes.filter(id => !id.equals(userIdObj));
            postAuthor.totalLikesReceived = Math.max(0, postAuthor.totalLikesReceived - 1);
            console.log('Removing like');
        } else {
            // Add like
            post.likes.push(userIdObj);
            postAuthor.totalLikesReceived = (postAuthor.totalLikesReceived || 0) + 1;
            console.log('Adding like');
        }

        // Update likesCount
        post.likesCount = post.likes.length;

        console.log('Updated post:', { 
            newLikes: post.likes,
            newLikesCount: post.likesCount,
            newUserTotalLikes: postAuthor.totalLikesReceived
        });

        // Save both post and author
        await Promise.all([
            post.save(),
            postAuthor.save()
        ]);

        res.status(200).json({ 
            success: true, 
            data: {
                ...post.toObject(),
                authorTotalLikes: postAuthor.totalLikesReceived
            }
        });
    } catch (error) {
        console.error('Error in likePost:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            success: false, 
            message: "Server Error",
            error: error.message
        });
    }
};

export const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        const posts = await Post.find({ userId })
            .sort({ createdAt: -1 }); // Sort by newest first
        
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.log("Error in fetching user posts: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid post ID format" });
    }

    try {
        const post = await Post.findById(id);
        
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};