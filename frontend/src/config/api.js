const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use your deployed backend URL
    // Replace this with your actual backend URL once deployed
    return 'https://instephgram.onrender.com'; // or Railway, Render, etc.
  }
  // In development, use the local backend
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiBaseUrl(); 