const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use your Render backend URL
    const url = import.meta.env.VITE_API_URL || 'https://instephgram.onrender.com';
    console.log('🔍 PRODUCTION API_BASE_URL:', url);
    console.log('🔍 VITE_API_URL env var:', import.meta.env.VITE_API_URL);
    console.log('🔍 import.meta.env.PROD:', import.meta.env.PROD);
    return url;
  }
  // In development, use the local backend
  console.log('🔍 DEVELOPMENT API_BASE_URL: http://localhost:5000');
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();
console.log('🔍 FINAL API_BASE_URL:', API_BASE_URL); 