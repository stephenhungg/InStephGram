# InStephGram Frontend

Modern React frontend for InStephGram - a social platform focused on collecting dislikes for terrible content.

## ✨ Features

### 🎨 Visual & Animation
- **3D Animated Background**: Three.js powered beams with rotating effects
- **Typing Animation**: Character-by-character welcome text
- **Glassmorphic Design**: Modern glass-like UI with backdrop blur
- **Smooth Animations**: Fade-in transitions on all pages
- **Geist Mono Font**: Clean, modern typography

### 🛠 Technical
- **React 18** with Vite for lightning-fast development
- **Chakra UI** for component library and theming
- **Three.js** for 3D graphics and animations
- **React Router** for client-side navigation
- **Zustand** for lightweight state management
- **Responsive Design** optimized for all devices

### 📱 User Experience
- **Video Support**: Upload and playback with native HTML5 controls
- **Lazy Loading**: Pagination for optimal performance
- **Error Handling**: Robust loading states and error boundaries
- **Accessibility**: Screen reader friendly and keyboard navigation

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## 📦 Dependencies

### Core
- `react` & `react-dom` - UI framework
- `@chakra-ui/react` - Component library
- `react-router-dom` - Routing
- `zustand` - State management

### Animations & Graphics
- `three` - 3D graphics library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `framer-motion` - Animation library

### Typography & Styling
- `geist` - Modern font family
- `@emotion/react` & `@emotion/styled` - CSS-in-JS

## 🚀 Deployment

This frontend is optimized for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Configure environment variable: `VITE_API_URL` → your backend URL
4. Deploy automatically on every push to main

### Build Output
- Optimized bundle with code splitting
- Static assets with cache headers
- Progressive Web App ready
