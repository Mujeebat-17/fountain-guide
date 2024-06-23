
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfpn6e3O6Nyir9jyqmdyMs-I4qzcpQxr0",
  authDomain: "fountain-guide.firebaseapp.com",
  projectId: "fountain-guide",
  storageBucket: "fountain-guide.appspot.com",
  messagingSenderId: "563783430756",
  appId: "1:563783430756:web:51c5e1c8a48b9d1232a571"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
export {
  auth, db
}
