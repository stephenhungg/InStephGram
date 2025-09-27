import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import userRoutes from "./routes/user.route.js"; 
import postRoutes from "./routes/post.route.js";
import uploadRoutes from "./routes/upload.route.js";
import commentRoutes from './routes/comment.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for cross-origin requests
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'http://localhost:5173', // Vite dev server
    'https://your-frontend-app.vercel.app' // Your Vercel app URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); //accept json data in body

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/upload", uploadRoutes);

// API-only server - frontend will be served from Vercel
app.get('/', (req, res) => {
    res.json({ 
        message: 'InStephGram API Server', 
        status: 'running',
        endpoints: {
            users: '/api/users',
            posts: '/api/posts',
            upload: '/api/upload',
            comments: '/api/posts (comments)'
        }
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
