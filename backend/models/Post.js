import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    likesCount: {
        type: Number,
        default: 0
    },
    // PrizePicks specific fields
    playerName: {
        type: String,
        required: false
    },
    sport: {
        type: String,
        required: false
    },
    teams: {
        type: String,
        required: false
    },
    line: {
        type: String,
        required: false
    },
    overUnder: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;