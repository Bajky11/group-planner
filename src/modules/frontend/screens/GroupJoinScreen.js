import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Drawer from "../components/CustomDrawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import Grid from "@mui/material/Unstable_Grid2";
import { generateRandomNonWhiteHexColor } from "../functions/generateRandomNonWhiteHexColor";
import { updateArrayFieldInDocument } from "../../backend/updateArrayFieldInDocument";
import { useAtom } from "jotai";
import { userAtom } from "../state/state";
import { useNavigate } from "react-router-dom";

const GroupJoinScreen = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleJoinGroup = async () => {
    if (user.groups.find(groupId => groupId === text)) {
      alert("V této skupině již jsi členem!")
      return;
    }
    try {
      const userGroups = getUserGroups();
      const success = await updateGroupInDatabase();

      if (success) {
        const userUpdateSuccess = await handleUserUpdate(userGroups);

        if (userUpdateSuccess) {
          navigate("/main");
        } else {
          throw new Error("Failed to update the user's groups.");
        }
      } else {
        throw new Error("Failed to update the test array.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Došlo k chybě. Akci nebylo možné dokončit.");
    }
  };

  const getUserGroups = () => {
    return Array.isArray(user.groups) ? [...user.groups, text] : [text];
  };

  const updateGroupInDatabase = async () => {
    try {
      await updateArrayFieldInDocument("groups", text, "users", [
        { id: user.id, color: generateRandomNonWhiteHexColor() },
      ]);
      return true;
    } catch (error) {
      console.error("Error updating group document:", error.message);
      return false;
    }
  };

  const handleUserUpdate = async (userGroups) => {
    try {
      await updateArrayFieldInDocument("users", user.id, "groups", userGroups);
      setUser({ ...user, groups: userGroups });
      return true;
    } catch (error) {
      console.error("Error updating user document:", error.message);
      return false;
    }
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
            <Button variant="contained" onClick={handleJoinGroup}>
              Připojit se
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </FullScreenColorContainer>
  );
};

export default GroupJoinScreen;
