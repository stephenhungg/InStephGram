const getApiBaseUrl = () => {
  // Force production mode for debugging
  const url = 'https://instephgram.onrender.com';
  console.log('🚀 FORCING BACKEND URL:', url);
  console.log('🔍 Current environment:', import.meta.env.MODE);
  console.log('🔍 Is production:', import.meta.env.PROD);
  console.log('🔍 VITE_API_URL env var:', import.meta.env.VITE_API_URL);
  return url;
};

export const API_BASE_URL = getApiBaseUrl();
console.log('🎯 FINAL API_BASE_URL:', API_BASE_URL); 