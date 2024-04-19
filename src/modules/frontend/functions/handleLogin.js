import CryptoJS from "crypto-js";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../.."; // Ujistěte se, že tato cesta je správná pro import instance Firestore
import { convertFirestoreTimestampsToDates } from "./convertFirestoreTimestampsToDates";

export const handleLogin = async ( username, password ) => {
    if (username ==  undefined || password == undefined) return;

    console.log(username, password)

    const hashedPassword = CryptoJS.SHA256(password).toString(
        CryptoJS.enc.Hex
    );

    const usersRef = collection(db, "users");
    const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", hashedPassword)
    );

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            // Předpokládáme, že uživatel je jedinečný a použijeme první dokument - TODO: jedinečnost není ošetřena
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            /*
            setUser({
                id: userDoc.id,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                groups: userData.groups,
                dates: convertFirestoreTimestampsToDates(userData.dates)
            });
            */
            return {
                id: userDoc.id,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                groups: userData.groups,
                dates: convertFirestoreTimestampsToDates(userData.dates)
            }
        } else {
            alert("Nesprávné přihlašovací údaje");
        }
    } catch (error) {
        console.error("Error during user login: ", error);
        alert("Při přihlašování došlo k chybě");
    }
};