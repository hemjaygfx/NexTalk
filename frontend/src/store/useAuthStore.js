
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: { name: "John Doe", email: "john.doe@example.com" },
    isLoggedIn: false,
    isLoading: false,

    login: (user) => {
        console.log("We just logged in!");
        set({ authUser: user, isLoggedIn: true });
    },
    logout: () => {
        console.log("We just logged out!");
        set({ authUser: null, isLoggedIn: false });
    },
}));
