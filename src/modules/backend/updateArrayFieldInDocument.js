import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../..";

/**
 * Updates an array field in a Firestore document by adding new elements without duplicates.
 *
 * @param {string} collectionName - The name of the collection containing the document.
 * @param {string} docId - The ID of the document to update.
 * @param {string} fieldName - The name of the array field to update.
 * @param {Array} newElements - An array of new elements to add to the field.
 */
export const updateArrayFieldInDocument = async (collectionName, docId, fieldName, newElements) => {
    if (!collectionName || !docId) {
        console.error("Invalid arguments: collectionName and docId must be provided");
        return false; // Return false immediately if the required parameters are not provided
      }
      
    const docRef = doc(db, collectionName, docId);
    try {
      await updateDoc(docRef, {
        [fieldName]: arrayUnion(...newElements)
      });
      console.log("Document successfully updated with new array elements!");
      return true; // Return true when the update is successful
    } catch (error) {
      console.error("Error updating document: ", error);
      return false; // Return false on encountering an error
    }
  };
