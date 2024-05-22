import { doc, runTransaction } from "firebase/firestore";

import { db } from "../../.."; // Upravte cestu k vaší konfiguraci Firebase

/**
 * Aktualizuje uživatele v poli 'users' specifického objektu v poli 'possibleDates'.
 *
 * @param {Array} possibleDates - Pole možných dat.
 * @param {string} dateId - ID objektu v poli 'possibleDates', který má být aktualizován.
 * @param {string} userId - ID uživatele, který má být přidán nebo odstraněn z pole 'users'.
 * @returns {Array} - Aktualizované pole 'possibleDates'.
 */
const updatePossibleDates = (possibleDates, dateId, userId) => {
  return possibleDates.map(date => {
    if (date.id !== dateId) {
      return date;
    }

    const users = date.users || [];
    const updatedUsers = users.includes(userId)
      ? users.filter(user => user !== userId)
      : [...users, userId];

    return { ...date, users: updatedUsers };
  });
};

/**
 * Aktualizuje pole 'users' uvnitř specifického objektu v poli 'possibleDates' pomocí transakce.
 *
 * @param {string} dateId - ID objektu v poli 'possibleDates', který má být aktualizován.
 * @param {string} userId - ID uživatele, který má být přidán nebo odstraněn z pole 'users'.
 * @returns {Promise<void>} - Vrací Promise, která se vyřeší po dokončení aktualizace.
 */
export const updatePossibleDateUsers = async (groupId, dateId, userId) => {
  const docRef = doc(db, 'groups', groupId);

  try {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);

      if (!docSnap.exists()) {
        throw new Error('Document does not exist.');
      }

      const data = docSnap.data();
      const possibleDates = data.possibleDates || [];

      // Aktualizace pole 'possibleDates' pomocí pomocné funkce
      const updatedPossibleDates = updatePossibleDates(possibleDates, dateId, userId);

      // Nastavení aktualizovaného pole 'possibleDates'
      transaction.update(docRef, { possibleDates: updatedPossibleDates });
    });

    console.log(`User ${userId} has been updated in possibleDates for date ${dateId}.`);
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
