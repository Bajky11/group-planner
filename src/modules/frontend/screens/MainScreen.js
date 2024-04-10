import "react-calendar/dist/Calendar.css";

import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { Button } from "@mui/material";
import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { db } from "../../../"; // Ujistěte se, že tato cesta je správná pro import instance Firestore
import { useAtom } from "jotai";
import { userAtom } from "../state/state";

const MainScreen = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleAddField = async () => {
    const userDocRef = doc(db, "users", user.id);

    try {
      await updateDoc(userDocRef, {
        newFieldName: "", // Zde nahraďte 'newFieldName' názvem pole, které chcete přidat nebo aktualizovat TODO: přidat uživatelovi zadané datumy
      });
      alert("Pole bylo úspěšně přidáno do dokumentu uživatele.");
    } catch (error) {
      console.error("Při přidávání pole došlo k chybě: ", error);
      alert("Při přidávání pole do dokumentu došlo k chybě.");
    }
  };

  return (
    <FullScreenColorContainer
      alignItems={"center"}
      justifyContent={"center"}
      Drawer={<Drawer />}
    >
      Osobní kalendář
      <CustomCalendar />
      <Button variant="contained" onClick={handleAddField}>
        Přidat pole do dokumentu uživatele
      </Button>
    </FullScreenColorContainer>
  );
};

export default MainScreen;
