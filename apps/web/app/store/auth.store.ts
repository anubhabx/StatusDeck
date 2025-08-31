import { create } from "zustand";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  error: string | null;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true, // Initially true while checking for current user
  error: null,
  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const user = await account.get();
      set({ user, loading: false });
    } catch (error) {
      set({ user: null, error: (error as Error).message });
    }
    set({ loading: false });
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await account.deleteSession({
        sessionId: "current"
      });
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message });
    }
    set({ loading: false });
  }
}));
