import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAR6M0-Jd9koiSyoo98_deav-Okl8z9HE",
  authDomain: "mp-project-bf603.firebaseapp.com",
  projectId: "mp-project-bf603",
  storageBucket: "mp-project-bf603.appspot.com",
  messagingSenderId: "421395840140",
  appId: "1:421395840140:web:5e9c5191db803a397b0fa9",
  measurementId: "G-4CQ31FDXWW",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
