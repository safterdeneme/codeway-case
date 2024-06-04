import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const getFirebaseConfig = () => {
  console.log("process.env.VUE_APP_FIREBASE_API_KEY",process.env.VUE_APP_FIREBASE_API_KEY)
  console.log("VUE_APP_FIREBASE_PROJECT_ID",process.env.VUE_APP_FIREBASE_PROJECT_ID)
  console.log("VUE_APP_API_TOKEN",process.env.VUE_APP_API_TOKEN)
  console.log("API_TOKEN",process.env.API_TOKEN)
  
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  };
  return firebaseConfig
}

const firebaseConfig = getFirebaseConfig()
initializeApp(firebaseConfig);

const auth = getAuth();

export { auth, signInWithEmailAndPassword };
