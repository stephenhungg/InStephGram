const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use your Render backend URL
    return import.meta.env.VITE_API_URL || 'https://instephgram.onrender.com';
  }
  // In development, use the local backend
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl(); 