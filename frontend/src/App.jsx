
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreateAccPage from "./pages/CreateAccPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import NavBar from "./components/NavBar";

function App() {

  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreateAccPage />}/>
        <Route path="/post" element={<CreatePostPage />}/>
      </Routes>
    </Box>
  )
}

export default App
