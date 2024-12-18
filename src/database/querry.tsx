// fetchData.ts

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "skincareData"));
  const docsData = querySnapshot.docs.map((doc) => doc.data());

  const sortedData = docsData
    .flatMap((entry) =>
      entry.ngày.map((item) => ({
        ...item,
        ngày: item.ngày instanceof Date ? item.ngày : item.ngày.toDate(),
      }))
    )
    .sort((a, b) => a.ngày.getTime() - b.ngày.getTime());

  const groupedData = sortedData.reduce((acc, item) => {
    const dateKey = item.ngày.toLocaleDateString();
    if (!acc.has(dateKey)) {
      acc.set(dateKey, []);
    }
    acc.get(dateKey)!.push(item);
    return acc;
  }, new Map<string, any[]>());

  return groupedData;
};
