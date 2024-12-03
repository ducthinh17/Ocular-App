import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { decodeBase64 } from "../pages/Result_medical";

const firebaseConfig = {
  apiKey: "AIzaSyDz8sjOP6FWU5CghOimZnLryKWMwqcGhGo",
  authDomain: "acnes-8b16a.firebaseapp.com",
  projectId: "acnes-8b16a",
  storageBucket: "acnes-8b16a.appspot.com",
  messagingSenderId: "811496508528",
  appId: "1:811496508528:web:f4d89974eafc89b973b8b5",
  measurementId: "G-PTFN7B9F9D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface SkincareData {
  tele: string;
  ngày: {
    ngày: Date | any;
    hình: string;
    bounding: Label[];
  }[];
}

interface Label {
  tên_Label: string;
  count: number;
  suggestion: string;
}



