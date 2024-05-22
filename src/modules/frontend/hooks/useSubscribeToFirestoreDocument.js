import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../..";

export const useFirestoreDocument = (collectionName, documentId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const documentRef = doc(db, collectionName, documentId);
    console.info("Subscribed to: " + collectionName + ", " + documentId)
    const unsubscribe = onSnapshot(
      documentRef,
      (doc) => {
        if (doc.exists()) {
          setData(doc.data());
          setLoading(false);
        } else {
          setError("Document does not exist!");
          setLoading(false);
        }
      },
      (err) => {
        setError("Error fetching document: " + err.message);
        setLoading(false);
      }
    );

    return () => {
      console.info("Unsubscribed to: " + collectionName + ", " + documentId)
      unsubscribe();
    }
  }, [collectionName, documentId]);

  return { data, loading, error };
};

export default useFirestoreDocument;
