import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreateAccPage from "./pages/CreateAccPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import NavBar from "./components/NavBar";
import AccPage from "./pages/AccPage";
import LoginPage from "./pages/LoginPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreateAccPage />}/>
        <Route path="/post" element={<CreatePostPage />}/>
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/acc" element={<AccPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/leaderboard" element={<LeaderboardPage />}/>
        <Route path="/user/:username" element={<UserProfilePage />}/>
      </Routes>
    </Box>
  );
}

export default App;
