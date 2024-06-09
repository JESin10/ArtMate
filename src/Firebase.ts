import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  databaseURL:
    "https://artmate-ver100-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

// for signin with google
export const provider = new GoogleAuthProvider();

// gives authentication instance
export const auth = getAuth(app); // app 객체를 넘겨줘야 함

// database
export const db = getFirestore(app);

//realTime Database
export const rtd = getDatabase(app);

// storage
export const storage = getStorage(app);

export default app;
