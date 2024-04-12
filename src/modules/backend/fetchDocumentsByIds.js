import { doc, getDoc } from "firebase/firestore";

import { db } from "../..";

export async function fetchDocumentsByIds(collectionName, documentIds) {
  try {
    const documents = [];
    for (let id of documentIds) {
      const docRef = doc(db, collectionName, id); // Get a reference to the document
      const docSnap = await getDoc(docRef); // Get the document snapshot
      if (docSnap.exists()) {
        documents.push({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log(`No such document found in ${collectionName} with id:`, id);
      }
    }
    return documents;
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    throw new Error(`Failed to fetch documents from ${collectionName}`);
  }
}
