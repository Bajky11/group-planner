import "react-calendar/dist/Calendar.css";

import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { formatDate } from "../functions/formatDate";
import { updateFirestoreDocument } from "../../backend/updateFirestoreDocument";
import { useAtom } from "jotai";
import { userAtom } from "../state/state";

const MainScreen = () => {
  const [user, setUser] = useAtom(userAtom);

  function handleSaveCalendar(updatedDates) {
    if (Object.keys(updatedDates).length === 0) {
      console.log("No dates to update");
      return;
    }
    updateFirestoreDocument("users", user.id, { dates: updatedDates });
    setUser({ ...user, dates: updatedDates });
  }

  function handleRemoveDate(index) {
    const updatedDates = [...user.dates];
    updatedDates.splice(index, 1);

    updateFirestoreDocument("users", user.id, { dates: updatedDates });
    setUser({ ...user, dates: updatedDates });

    // Výpis pro kontrolu
    console.log(index);
    console.log(updatedDates);
    console.log("Date removed successfully");
  }

  return (
    <FullScreenColorContainer
      alignItems={"center"}
      justifyContent={"center"}
      Drawer={<Drawer />}
      spacing={2}
    >
      <Typography variant="h4">Můj kalendář</Typography>
      <CustomCalendar
        onDatesChange={(updatedDates) => handleSaveCalendar(updatedDates)}
        dates={user.dates}
      />
      <Typography>Kliknutím odstraníš záznam:</Typography>
      {user.dates.map((date, index) => (
        <Button
          key={index}
          color="error"
          style={{ margin: "10px" }}
          onClick={() => handleRemoveDate(index)}
        >
          {formatDate(date.start)} - {formatDate(date.end)}
          <div
            style={{
              backgroundColor: date.color || "grey",
              width: "10px",
              height: "10px",
              display: "inline-block",
              marginLeft: "10px",
            }}
          ></div>
        </Button>
      ))}
    </FullScreenColorContainer>
  );
};

export default MainScreen;
