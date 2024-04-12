import "react-calendar/dist/Calendar.css";

import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { Typography } from "@mui/material";
import { convertFirestoreTimestampsToDates } from "../functions/convertFirestoreTimestampsToDates";
import { db } from "../../../"; // Ujistěte se, že tato cesta je správná pro import instance Firestore
import { updateFirestoreDocument } from "../../backend/updateFirestoreDocument";
import { useAtom } from "jotai";
import { userAtom } from "../state/state";

const MainScreen = () => {
  const [user, setUser] = useAtom(userAtom);
  const initialData = convertFirestoreTimestampsToDates(user.dates);

  const handleSaveCalendar = (dates) => {
    // Check if 'dates' is not an empty object
    if (Object.keys(dates).length !== 0) {
      updateFirestoreDocument("users", user.id, { dates: dates });
      console.log("update firestore document");
    } else {
      console.log("No dates to update");
    }

  };

  return (
    <FullScreenColorContainer
      alignItems={"center"}
      justifyContent={"center"}
      Drawer={<Drawer />}
      spacing={2}
    >
      <Typography variant="h4">Můj kalendář</Typography>
      <CustomCalendar
        onDatesChange={handleSaveCalendar}
        initialData={initialData}
      />
    </FullScreenColorContainer>
  );
};

export default MainScreen;
