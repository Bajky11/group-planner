import { addDoc, collection } from "firebase/firestore";

import { db } from "../..";

export const addFirestoreDocument = async (collectionPath, newData) => {
  const collectionRef = collection(db, collectionPath);
  try {
    const docRef = await addDoc(collectionRef, newData);
    console.log("Dokument byl úspěšně vytvořen s ID: ", docRef.id);
    //alert("Nový dokument byl úspěšně přidán.");   TODO: check number of requests
    return docRef.id; // Vrací ID nově vytvořeného dokumentu
  } catch (error) {
    console.error("Došlo k chybě při vytváření dokumentu: ", error);
    //alert("Při vytváření dokumentu došlo k chybě.");  TODO: check number of requests
  }
};
