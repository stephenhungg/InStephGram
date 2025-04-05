import {create} from "zustand"

export const useUserGlobal = create((set) => ({
    users: [],
    currentUser: null,
    setUsers: (users) => set({ users }),
    setCurrentUser: (user) => set({ currentUser: user }),
    createUser: async (newUser) => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch("/api/users", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        const data = await res.json();
        set((state) => ({ users: [...state.users, data] }));
        return { success: true, message: "User created successfully" };
    },
    login: async (credentials) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Login failed" };
            }
            
            const data = await res.json();
            const userData = {
                ...data.data,
                id: data.data._id
            };
            set({ currentUser: userData });
            return { success: true, message: "Login successful" };
        } catch (error) {
            return { success: false, message: "An error occurred during login" };
        }
    }
}))