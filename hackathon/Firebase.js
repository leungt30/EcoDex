// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxp8GpDwz0ER3O2otOAG4I_-F1AdlowK0",
  authDomain: "gdsc-2024-hackathon.firebaseapp.com",
  projectId: "gdsc-2024-hackathon",
  storageBucket: "gdsc-2024-hackathon.appspot.com",
  messagingSenderId: "735223007607",
  appId: "1:735223007607:web:4bd475f3d4045748653972",
  measurementId: "G-RLERTJ192X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app) //regular firestore db
export const EntityCol = collection(db, "entity")
export const PlayerCol = collection(db, "player")
// export const auth = getAuth(app)
