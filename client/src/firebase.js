import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCyh9mLOVviOh1YClelTPdmdU0wogK6KZA",
    authDomain: "clone-8061c.firebaseapp.com",
    projectId: "clone-8061c",
    storageBucket: "clone-8061c.appspot.com",
    messagingSenderId: "975218676373",
    appId: "1:975218676373:web:d5595fc2166d435100819c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;