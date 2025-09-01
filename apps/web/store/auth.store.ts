import { create } from "zustand";
import { Models } from "appwrite";
import { authService } from "@/lib/auth";

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  error: string | null;
  getCurrentUser: () => Promise<void>;
  setCurrentUser: (user: Models.User<Models.Preferences> | null) => void;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  initializeAuth: async () => {
    set({ loading: true, error: null });

    try {
      const result = await authService.getCurrentUser();

      if (result.error) {
        // Silently handle auth errors on initialization
        if (
          result.error.includes("401") ||
          result.error.includes("User (role: guests) missing scope")
        ) {
          set({ user: null, loading: false, error: null });
        } else {
          set({
            user: null,
            error: result.error,
            loading: false
          });
        }
      } else {
        set({ user: result.user || null, loading: false });
      }
    } catch (error) {
      set({
        user: null,
        error: (error as Error).message,
        loading: false
      });
    }
  },

  getCurrentUser: async () => {
    set({ loading: true, error: null });
    const result = await authService.getCurrentUser();

    if (result.error) {
      // Don't treat 401 as an error - it just means no valid session
      if (
        result.error.includes("401") ||
        result.error.includes("unauthorized")
      ) {
        set({ user: null, error: null, loading: false });
      } else {
        set({ user: null, error: result.error, loading: false });
      }
    } else {
      set({ user: result.user || null, loading: false });
    }
  },

  setCurrentUser: (user) => set({ user }),

  signUp: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    const result = await authService.signUp(email, password, name);

    if (result.error) {
      set({ error: result.error, loading: false });
      return false;
    } else {
      set({ user: result.user || null, loading: false });
      return true;
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const result = await authService.signIn(email, password);

    if (result.error) {
      set({ error: result.error, loading: false });
      return false;
    } else {
      set({ user: result.user || null, loading: false });
      return true;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    const result = await authService.signOut();

    if (result.error) {
      set({ error: result.error, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  setError: (error) => set({ error })
}));
