# InStephGram

A modern social platform where users compete to post the worst content possible and collect dislikes. Built with cutting-edge web technologies and featuring stunning 3D animations.

## Tech Stack

**Frontend:**
- React 18 with Vite
- Chakra UI for components and theming
- Three.js for 3D animated backgrounds
- React Router for navigation
- Zustand for state management
- Geist Mono typography
- CSS animations and glassmorphic design

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- AWS S3 for media storage
- FFmpeg for video compression
- CORS enabled for cross-origin requests
- RESTful API design

## Architecture

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas
- **Storage**: AWS S3

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: Secure login/signup system
- **Media Sharing**: Upload images and videos (up to 100MB)
- **Video Support**: Automatic FFmpeg compression and HTML5 playback
- **Dislike System**: Unique focus on collecting dislikes instead of likes
- **Comments**: Engage with posts through comments
- **Leaderboard**: Track the most disliked users
- **User Profiles**: Personalized pages with post history

### 🎨 Visual Experience
- **3D Animated Background**: Three.js powered beams with 30° rotation
- **Typing Animation**: Welcome text types out character by character
- **Glassmorphic UI**: Modern glass-like design with backdrop blur
- **Fade-in Animations**: Smooth page transitions and element reveals
- **Geist Mono Font**: Clean, modern typography throughout
- **Responsive Design**: Optimized for desktop and mobile

### ⚡ Performance
- **Lazy Loading**: Pagination with "Load More" functionality
- **Video Compression**: Server-side optimization for streaming
- **Error Handling**: Robust error states and loading indicators
- **No Login Required**: Public leaderboard access

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Deployment

The application is configured for separate deployments:
- Frontend deploys to Vercel
- Backend deploys to Render
- Configure environment variables for production

## Environment Variables

### Frontend (Vercel)
- `VITE_API_URL`: Your Render backend URL

### Backend (Render)
- `MONGO_URI`: MongoDB connection string
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `S3_BUCKET_NAME`: S3 bucket name
- `PORT`: Server port (default: 3001)

## 🎮 How to Play

1. **Create Account**: Sign up to start posting
2. **Upload Content**: Share your worst images and videos
3. **Get Disliked**: Aim to collect as many dislikes as possible
4. **Climb the Leaderboard**: Compete to be the most disliked user
5. **Comment**: Engage with other terrible content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ and a lot of ☕ by stephen hung
