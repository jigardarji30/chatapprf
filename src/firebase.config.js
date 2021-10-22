import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl6EFvv_qt6wEk7bK93SRtRHw7wP0ufbM",
  authDomain: "chatapp-7c5c4.firebaseapp.com",
  projectId: "chatapp-7c5c4",
  storageBucket: "chatapp-7c5c4.appspot.com",
  messagingSenderId: "218097795564",
  appId: "1:218097795564:web:ecd3f0995a1d561c4740c9",
  measurementId: "G-QN74MZ53QK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
