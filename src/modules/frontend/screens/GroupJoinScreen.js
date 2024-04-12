import { Button, Paper, TextField, Typography } from "@mui/material";

import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import Grid from "@mui/material/Unstable_Grid2";
import { generateRandomNonWhiteHexColor } from "../functions/generateRandomNonWhiteHexColor";
import { updateArrayFieldInDocument } from "../../backend/updateArrayFieldInDocument";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../state/state";

const GroupJoinScreen = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useAtom(userAtom);

  const handleJoingroup = () => {
    /*
    updateArrayFieldInDocument("groups", text, "users", [user.id]).then(
      (success) => {
        if (success) {
          console.log("The array was successfully updated.");
          const updatedGroups = [...user.groups, text];
          updateArrayFieldInDocument("users", user.id, "groups", [text])
          setUser({ ...user, groups: updatedGroups });
        } else {
          console.log("Failed to update the array.");
          alert("Nepodařilo se přidat do skupiny");
        }
      }
    );*/
    // Assuming text is the group ID and user.id is the current user's ID
    // Assuming text is the group ID and user.id is the current user's ID
    // Check if user.groups is iterable
    const userGroups = Array.isArray(user.groups)
      ? [...user.groups, text]
      : [text];

    updateArrayFieldInDocument("groups", text, "test", [
      { id: user.id, color: generateRandomNonWhiteHexColor() },
    ])
      .then((success) => {
        if (success) {
          console.log("The test array was successfully updated.");
          // Update the user's document with the new group ID
          updateArrayFieldInDocument(
            "users",
            user.id,
            "groups",
            userGroups
          ).then((userUpdateSuccess) => {
            if (userUpdateSuccess) {
              // Set the user's state with the updated groups array
              setUser({ ...user, groups: userGroups });
            } else {
              console.log("Failed to update the user's groups.");
              alert("Nepodařilo se aktualizovat skupiny uživatele");
            }
          });
        } else {
          console.log("Failed to update the test array.");
          alert("Nepodařilo se přidat do skupiny");
        }
      })
      .catch((error) => {
        console.error("Error updating document:", error);
        alert("Chyba při aktualizaci dokumentu");
      });
  };

  return (
    <FullScreenColorContainer
      alignItems="center"
      justifyContent="center"
      Drawer={<Drawer />}
      spacing={2}
    >
      <Typography variant="h4">Připojit se do skupiny</Typography>
      <Paper elevation={2}>
        <Grid
          container
          padding={3}
          spacing={1}
          direction={"column"}
          alignItems={"center"}
        >
          <Grid>
            <TextField
              label={"ID skupiny"}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button variant="contained" onClick={handleJoingroup}>
              Připojit se
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FullScreenColorContainer>
  );
};

export default GroupJoinScreen;
