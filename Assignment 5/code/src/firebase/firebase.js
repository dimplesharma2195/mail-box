import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase auth persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, db, collection, addDoc };