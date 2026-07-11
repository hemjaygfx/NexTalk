

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isRegistering: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data});
    } catch (error) {
        console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
    register: async (data) => {
      set({ isRegistering: true });
      try {
        const response = await axiosInstance.post("/auth/register", data);
        set({ authUser: response.data });

        // toast 
        toast.success("Registration successful! You can now log in.");

      } catch (error) {
        console.log("Error registering:", error);
      } finally {
        set({ isRegistering: false });
      }
    }
}));

