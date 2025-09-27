const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production on Vercel, use same domain (no CORS issues!)
    return '';
  }
  // In development, use the local backend
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl(); 