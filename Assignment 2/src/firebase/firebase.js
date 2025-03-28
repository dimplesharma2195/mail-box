import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9q3x4LzL8b8HXAOkqriREST9KsttA7RM",
  authDomain: "mail-box-612d7.firebaseapp.com",
  projectId: "mail-box-612d7",
  storageBucket: "mail-box-612d7.firebasestorage.app",
  messagingSenderId: "374743294684",
  appId: "1:374743294684:web:491b4110386d082998ca19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };