import Cookies from 'js-cookie';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBllA8AWrQv-jmtt8st_BmUpVo_TI0SLXg",
    authDomain: "todo-ec422.firebaseapp.com",
    projectId: "todo-ec422",
    storageBucket: "todo-ec422.appspot.com",
    messagingSenderId: "721126410765",
    appId: "1:721126410765:web:a3bc77c2a9347b532c2344"
  };
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();