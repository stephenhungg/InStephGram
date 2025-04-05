import User from "../models/User.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in fetching users: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID"});
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error in fetching user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide username and password" });
    }

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.log("Error in login: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }
        
        const newUser = new User(user);
        await newUser.save();
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.error("Error in Create User:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID"});
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({success: true, data: updatedUser});
    } catch(error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({})
            .select('username totalLikesReceived profileImage') // Only select needed fields
            .sort({ totalLikesReceived: -1 }) // Sort by likes in descending order
            .limit(50); // Limit to top 50 users

        const leaderboardData = users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            score: user.totalLikesReceived,
            profileImage: user.profileImage
        }));

        res.status(200).json({ success: true, data: leaderboardData });
    } catch (error) {
        console.log("Error in fetching leaderboard: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.log("Error in fetching user profile: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}