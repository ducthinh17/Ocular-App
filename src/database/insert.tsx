import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { getExportedImage } from "../pages/Result_medical";
import { getBoundingBoxes } from "../pages/Result_medical";
import { getSkincareIngredients } from "../pages/Suggestions";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

export const firebaseConfig = {
  apiKey: "AIzaSyDz8sjOP6FWU5CghOimZnLryKWMwqcGhGo",
  authDomain: "acnes-8b16a.firebaseapp.com",
  projectId: "acnes-8b16a",
  storageBucket: "acnes-8b16a.firebasestorage.app",
  messagingSenderId: "811496508528",
  appId: "1:811496508528:web:f4d89974eafc89b973b8b5",
  measurementId: "G-PTFN7B9F9D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface SkincareData {
  userid: string;
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

const createData = (userid: string, ngày: Date, hình: string, bounding: label[]): SkincareData => {
  return {
    userid: userid,
    ngày: [
      {
        ngày: ngày,
        hình: hình,
        bounding: bounding,
      },
    ],
  };
};

const pushDataToDatabase = async (userID: string, skincareData: SkincareData) => {
  try {
    const ref = doc(db, 'skincareData', userID); // Set tele as the document ID
    await setDoc(ref, skincareData);
    console.log("Data has been successfully saved!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const saveData = async (userInfo: { id: string }) => {
  try {
    const userid = userInfo.id;

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

    const skincareData = createData(userid, currentDate, image, labels);
    await pushDataToDatabase(userid, skincareData);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};


export const pushSurveyData = async (userID: string, surveyData: object) => {
  try {
    const exists = await checkUserIDExists(userID);
    if (exists) {
      console.log("UserID already exists. Survey data not saved.");
    } else {
      await setDoc(doc(db, "SurveyAns", userID), surveyData);
      console.log("Survey data has been successfully saved!");
    }
  } catch (error) {
    console.error("Error saving survey data:", error);
  }
};

export const checkUserIDExists = async (userID: string): Promise<boolean> => {
  if (!userID) {
    console.error("Invalid userID: userID cannot be empty.");
    return false;
  }

  try {
    const docRef = doc(db, "SurveyAns", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking phone number:", error);
    return false;
  }
};

export const checkUserIDExists2 = async (userID: string): Promise<boolean> => {
  if (!userID) {
    console.error("Invalid userID: userID cannot be empty.");
    return false;
  }

  try {
    const docRef = doc(db, "UserInfo", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking userID:", error);
    return false;
  }
};



export const pushAccountInfo = async (userID: string, accountInfo: object) => {
  try {
    const exists = await checkUserIDExists2(userID);
    if (exists) {
      console.log("UserID already exists. Account info not saved.");
    } else {
      await setDoc(doc(db, "UserInfo", userID), accountInfo);
      console.log("Account info has been successfully saved!");
    }
  } catch (error) {
    console.error("Error saving account info:", error);
  }
};