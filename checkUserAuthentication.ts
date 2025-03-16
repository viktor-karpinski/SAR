import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

const checkUserAuthentication = (): Promise<{ isAuthenticated: boolean; firebaseToken: string | null }> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(); 
        resolve({ isAuthenticated: true, firebaseToken: token });
      } else {
        resolve({ isAuthenticated: false, firebaseToken: null });
      }
    });
  });
};

export default checkUserAuthentication;
