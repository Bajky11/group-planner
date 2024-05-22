import { doc, getDoc } from "firebase/firestore";

import { db } from "../..";

/**
 * Ověří, zda jsou poskytnuty všechny požadované argumenty.
 *
 * @param {string} collectionName - Název kolekce v Firestore.
 * @param {string} docId - ID dokumentu v kolekci.
 * @param {string} fieldName - Název pole, které se má načíst z dokumentu.
 * @returns {boolean} - Vrací true, pokud jsou všechny argumenty poskytnuty, jinak false.
 */
const validateArguments = (collectionName, docId, fieldName) => {
  if (!collectionName || !docId || !fieldName) {
    console.error(
      "Invalid arguments: collectionName, docId, and fieldName must be provided"
    );
    return false;
  }
  return true;
};

/**
 * Načte dokument z Firestore podle zadané kolekce a ID dokumentu.
 *
 * @param {string} collectionName - Název kolekce v Firestore.
 * @param {string} docId - ID dokumentu v kolekci.
 * @returns {Object|null} - Vrací data dokumentu, pokud existuje, jinak null.
 */
const fetchDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

/**
 * Načte specifické pole z dokumentu v kolekci Firestore.
 *
 * @param {string} collectionName - Název kolekce v Firestore.
 * @param {string} docId - ID dokumentu v kolekci.
 * @param {string} fieldName - Název pole, které se má načíst z dokumentu.
 * @returns {any|null|false} - Vrací hodnotu pole, pokud existuje, jinak null. Vrací false, pokud nejsou poskytnuty požadované argumenty.
 */
export async function fetchDocumentField(collectionName, docId, fieldName) {
  // Ověření argumentů
  if (!validateArguments(collectionName, docId, fieldName)) {
    return false;
  }

  try {
    // Načtení dokumentu
    const documentData = await fetchDocument(collectionName, docId);

    if (documentData) {
      // Kontrola, zda pole existuje v dokumentu
      if (fieldName in documentData) {
        return documentData[fieldName];
      } else {
        console.error(`Field ${fieldName} does not exist in document ${docId}`);
        return null;
      }
    } else {
      console.error(
        `Document ${docId} does not exist in collection ${collectionName}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    throw new Error(`Failed to fetch document from ${collectionName}`);
  }
}
