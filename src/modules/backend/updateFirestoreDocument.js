// firebaseUtils.js

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../..";

export const updateFirestoreDocument = async (collectionPath, docId, updateData) => {
    if (!docId) {
      console.error("Chybné nebo chybějící ID dokumentu");
      alert("Nastala chyba, je nutné nové přihlašení.");
      return;
    }
  
    const docRef = doc(db, collectionPath, docId);
    try {
      await updateDoc(docRef, updateData);
      alert("Data byla úspěšně aktualizována.");
    } catch (error) {
      console.error("Došlo k chybě při aktualizaci dokumentu: ", error);
      alert("Při aktualizaci dokumentu došlo k chybě.");
    }
  };
