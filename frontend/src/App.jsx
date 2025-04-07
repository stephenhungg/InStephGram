import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import AccPage from './pages/AccPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import TechnicalOverviewPage from './pages/TechnicalOverviewPage';
import { UserProvider } from './global/user';

function App() {
    return (
        <ChakraProvider>
            <UserProvider>
                <Box minH="100vh" bg="gray.900">
                    <NavBar />
                    <Box as="main" py={8}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/create" element={<CreatePostPage />} />
                            <Route path="/acc" element={<AccPage />} />
                            <Route path="/post/:postId" element={<PostDetailPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/technical" element={<TechnicalOverviewPage />} />
                        </Routes>
                    </Box>
                </Box>
            </UserProvider>
        </ChakraProvider>
    );
}

export default App;
