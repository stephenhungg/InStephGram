# InStephGram

A competition-based Instagram-style full-stack web application built with modern technologies.

## Tech Stack

**Frontend:**
- React 18 with Vite
- Chakra UI for components
- React Router for navigation
- Zustand for state management

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- AWS S3 for image storage
- CORS enabled for cross-origin requests

## Architecture

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas
- **Storage**: AWS S3

## Features

- User authentication and profiles
- Create and share posts with images
- Like and comment system
- Real-time updates
- Responsive design
- Image upload with AWS S3

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
- `AWS_REGION`: AWS region
- `S3_BUCKET_NAME`: S3 bucket name
