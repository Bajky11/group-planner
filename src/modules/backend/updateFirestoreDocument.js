import { deleteField, doc, updateDoc } from "firebase/firestore";

import { db } from "../..";

// Asynchronní funkce pro aktualizaci dokumentu v Firestore
export const updateFirestoreDocument = async (
  collectionPath,
  docId,
  updateData
) => {
  // Kontrola, zda je poskytnuto ID dokumentu
  if (!docId) {
    console.error("Chybné nebo chybějící ID dokumentu");
    alert("Nastala chyba, je nutné nové přihlašení.");
    return;
  }

  // Vytvoření reference dokumentu pomocí cesty kolekce a ID dokumentu
  const docRef = doc(db, collectionPath, docId);
  try {
    // Inicializace objektu pro shromažďování aktualizací
    const fieldsToUpdate = {};

    // Iterace přes všechna klíčová data v updateData
    for (const [key, value] of Object.entries(updateData)) {
      // Kontrola, zda je hodnota prázdné pole
      if (Array.isArray(value) && value.length === 0) {
        // Nastavení příkazu pro odstranění pole, pokud je prázdné
        fieldsToUpdate[key] = deleteField();
      } else {
        // Přiřazení hodnoty k aktualizaci
        fieldsToUpdate[key] = value;
      }
    }

    // Provedení aktualizace dokumentu s připravenými hodnotami
    await updateDoc(docRef, fieldsToUpdate);
  } catch (error) {
    console.error("Došlo k chybě při aktualizaci dokumentu: ", error);
    // Zobrazit upozornění na chybu, pokud se aktualizace nezdaří
  }
};
