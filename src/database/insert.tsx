import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { decodeBase64 } from "../pages/Result_medical";
import { getExportedImage } from "../pages/Result_medical";
import { getBoundingBoxes } from "../pages/Result_medical";
import { getSkincareIngredients } from "../pages/Suggestions";
import { useNavigate } from "zmp-ui";


const firebaseConfig = {
    apiKey: "AIzaSyDz8sjOP6FWU5CghOimZnLryKWMwqcGhGo",
    authDomain: "acnes-8b16a.firebaseapp.com",
    projectId: "acnes-8b16a",
    storageBucket: "acnes-8b16a.appspot.com",
    messagingSenderId: "811496508528",
    appId: "1:811496508528:web:f4d89974eafc89b973b8b5",
    measurementId: "G-PTFN7B9F9D"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

interface SkincareData {
  tele: string;
  ngày: {
    ngày: Date;
    hình: string;
    bounding: label[];
  }[];
}

interface label {
  tên_Label: string;
  count: number;
  suggestion: string;
}

const createData = (tele: string, ngày: Date, hình: string, bounding: label[]): SkincareData => {
  const skincareData: SkincareData = {
    tele: tele,
    ngày: [
      {
        ngày: ngày,
        hình: hình,
        bounding: bounding,
      },
    ],
  };

  return skincareData;
};

const pushDataToDatabase = (skincareData: SkincareData) => {
  try {
    const ref = collection(db, 'skincareData');
   addDoc(ref, skincareData);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const saveData = async () => {
  try {
    const tele = "user_telephone"; 
    const currentDate = new Date();
    const image = getExportedImage(); 
    const boundingBoxes = getBoundingBoxes();

    const countBoundingBoxes = boundingBoxes.reduce((acc, box) => {
      if (!acc[box.class_id]) {
        acc[box.class_id] = 1;
      } else {
        acc[box.class_id]++;
      }
      return acc;
    }, {} as Record<string, number>);

    const labels: { tên_Label: string; count: number; suggestion: string }[] = Object.entries(countBoundingBoxes).map(
      ([key, count]) => {
        const { customName, suggestionsArray } = getSkincareIngredients(key);
        return {
          tên_Label: customName,
          count,
          suggestion: suggestionsArray.join(", "),
        };
      }
    );

    const skincareData = createData(tele, currentDate, image, labels);
     pushDataToDatabase(skincareData);  
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
