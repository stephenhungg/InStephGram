import {create} from "zustand"
import { API_BASE_URL } from '../config/api';

export const usePostGlobal = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    createPost: async (newPost) => {
        if (!newPost.caption || !newPost.title || !newPost.userId) {
            return {success: false, message: "Please fill in all fields"};
        }
        try {
            console.log("Sending post data to API:", newPost);
            const res = await fetch(`${API_BASE_URL}/api/posts`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });
            
            const data = await res.json();
            console.log("API response:", data);
            
            if (!res.ok) {
                console.error("Error creating post. Status:", res.status, "Response:", data);
                return { success: false, message: data.message || "Failed to create post" };
            }
            
            set((state) => ({ posts: [...state.posts, data.data] }));
            return { success: true, message: "Post created successfully" };
        } catch (error) {
            console.error("Error creating post:", error);
            return { success: false, message: "Failed to create post: " + (error.message || "Unknown error") };
        }
    }
}))