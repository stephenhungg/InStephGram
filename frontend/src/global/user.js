import {create} from "zustand"

export const useUserGlobal = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
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
    }
}))