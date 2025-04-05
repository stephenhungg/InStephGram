const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use the same domain as the frontend
    return '';
  }
  // In development, use the Vite proxy (which points to localhost:5000)
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl(); 