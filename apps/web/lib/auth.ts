import { account } from "./appwrite";
import { Models } from "appwrite";

export interface AuthResult {
  user?: Models.User<Models.Preferences>;
  session?: Models.Session;
  error?: string;
}

export const authService = {
  // Sign up with email and password
  signUp: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResult> => {
    try {
      const user = await account.create("unique()", email, password, name);

      // Automatically sign in after successful registration
      const session = await account.createEmailPasswordSession(email, password);

      return { user, session };
    } catch (error) {
      return { error: (error as Error).message };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      return { user, session };
    } catch (error) {
      return { error: (error as Error).message };
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResult> => {
    try {
      const user = await account.get();
      return { user };
    } catch (error: any) {
      // Handle specific error cases
      if (error.code === 401 || error.message?.includes("401")) {
        // No valid session - this is normal, not an error
        return { user: undefined };
      }
      return { error: error.message || "Failed to get current user" };
    }
  },

  // Sign out
  signOut: async (): Promise<AuthResult> => {
    try {
      await account.deleteSession("current");
      return {};
    } catch (error) {
      return { error: (error as Error).message };
    }
  },

  // Delete all sessions (sign out from all devices)
  signOutAll: async (): Promise<AuthResult> => {
    try {
      await account.deleteSessions();
      return {};
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
};
