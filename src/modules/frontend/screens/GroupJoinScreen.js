import { Button, Paper, TextField, Typography } from "@mui/material";

import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import Grid from "@mui/material/Unstable_Grid2";
import { updateArrayFieldInDocument } from "../../backend/updateArrayFieldInDocument";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../state/state";

const GroupJoinScreen = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useAtom(userAtom);

  const handleJoingroup = () => {
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
    );
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
