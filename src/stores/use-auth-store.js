import { create } from "zustand";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase.config";

// Initialize the GoogleAuthProvider instance to use Google's authentication services.
const provider = new GoogleAuthProvider();

/**
 * useAuthStore is a Zustand store that manages the authentication state of the user.
 * It provides methods to login, logout, and observe changes in the user's authentication status.
 */
const useAuthStore = create((set) => ({
  // The current authenticated user. Initially set to null.
  user: null,

  // A boolean that indicates whether the authentication process is still loading.
  loading: true,

  /**
   * Initiates the sign-in process using a Google popup window.
   * If an error occurs during sign-in, it is logged to the console.
   */
  loginGoogleWithPopUp: async () => {
    await signInWithPopup(auth, provider)
    .catch((error) => {
      console.log(error);
    });
  },

  /**
   * Signs the user out of the application.
   * On successful sign-out, the user state is reset to null.
   * If an error occurs during sign-out, it is logged to the console.
   */
  logout: async () => {
    await signOut(auth)
      .then(() => {
        set({ user: null });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * Observes changes to the user's authentication state.
   * While checking the state, the loading state is set to true.
   * Once the state is determined, it updates the user and loading states accordingly.
   */
  observeAuthState: () => {
    set({ loading: true });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  },
}));

export default useAuthStore;
