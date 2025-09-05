import { account } from "./appwrite";
import { Models } from "appwrite";

export interface AuthResult {
  success?: boolean;
  message?: string;
  user?: Models.User<Models.Preferences>;
  session?: Models.Session;
  error?: string;
}

// Helper function to set session cookie
const setSessionCookie = (sessionId: string) => {
  if (typeof window !== "undefined") {
    // Set cookie with proper security flags
    document.cookie = `session=${sessionId}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
  }
};

// Helper function to remove session cookie
const removeSessionCookie = () => {
  if (typeof window !== "undefined") {
    document.cookie = "session=; path=/; max-age=0";
  }
};

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

      // Set session cookie for middleware
      setSessionCookie(session.$id);

      return {
        success: true,
        message: "User registered successfully",
        user,
        session
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to sign up",
        error: (error as Error).message
      };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      // Set session cookie for middleware
      setSessionCookie(session.$id);

      return {
        success: true,
        message: "Signed in successfully",
        user,
        session
      };
    } catch (error) {
      return {
        success: false,
        message: "Invalid email or password",
        error: (error as Error).message
      };
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResult> => {
    try {
      const user = await account.get();
      return {
        success: true,
        user
      };
    } catch (error: any) {
      // Handle specific error cases
      if (error.code === 401 || error.message?.includes("401")) {
        // No valid session - remove invalid cookie
        removeSessionCookie();
        return {
          success: false,
          message: "No active session",
          user: undefined
        };
      }
      return {
        success: false,
        message: "Failed to get current user",
        error: error.message || "Failed to get current user"
      };
    }
  },

  // Sign out
  signOut: async (): Promise<AuthResult> => {
    try {
      await account.deleteSession("current");
      removeSessionCookie();
      return { success: true, message: "Signed out successfully" };
    } catch (error) {
      // Even if the API call fails, clear the local cookie
      removeSessionCookie();
      return {
        success: false,
        message: "Something went wrong, please try again",
        error: (error as Error).message
      };
    }
  },

  // Delete all sessions (sign out from all devices)
  signOutAll: async (): Promise<AuthResult> => {
    try {
      await account.deleteSessions();
      removeSessionCookie();
      return {
        success: true,
        message: "Signed out from all devices successfully"
      };
    } catch (error) {
      removeSessionCookie();
      return {
        success: false,
        message: "Something went wrong, please try again",
        error: (error as Error).message
      };
    }
  }
};
