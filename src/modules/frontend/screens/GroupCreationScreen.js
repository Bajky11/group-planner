import { Button, Paper } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Divider } from "@mui/material";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import Grid from "@mui/material/Unstable_Grid2";
import { addFirestoreDocument } from "../../backend/addFirestoreDocument";
import { updateFirestoreDocument } from "../../backend/updateFirestoreDocument";
import { useAtom } from "jotai";
import { userAtom } from "../state/state";

const users = [
  { username: "Lukas Cerny" },
  { username: "Lukas Novohradsky" },
  { username: "Michal Bielak" },
  { username: "Vojta Kouril" },
  { username: "Tomas Lipovsky" },
  { username: "Matej Varga" },
];

const GroupCreationScreen = () => {
  const [groupName, setGroupName] = useState("");
  const [text, setText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useAtom(userAtom);

  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      if (text === "") {
        setFilteredUsers([]);
        return;
      }
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    } else {
      hasMounted.current = true;
    }
  }, [text]);

  function onAdd(user) {
    // Tady je predikátní funkce, která hledá uživatele se stejným username
    if (!selectedUsers.some((u) => u.username === user.username)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  }

  function onRemove(userToRemove) {
    setSelectedUsers(
      selectedUsers.filter((user) => user.username !== userToRemove.username)
    );
  }

  const createGroup = async () => {
    try {
      const groupId = await addFirestoreDocument("groups", {
        name: groupName,
        users: [user.id],
      });

      const updatedGroups = [...user.groups, groupId];
      await updateFirestoreDocument("users", user.id, {
        groups: updatedGroups,
      });

      setUser({ ...user, groups: updatedGroups }); // Update local state to reflect change


      //TODO: Optionally, add group ID to each selected user's groups in the backend
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <FullScreenColorContainer
      alignItems="center"
      justifyContent="center"
      Drawer={<Drawer />}
      spacing={2}
    >
      <Typography variant="h3">Tvorba skupiny</Typography>
      <Typography color={"error"}>
        VAROVÁNÍ: Vybraní členové nebudou do skupiny přidáni, tato funkce není
        dokončena. Uživatelé se do skupiny připojí skrze tlačítko PŘIPOJIT SE a
        ID skupiny.
      </Typography>
      <Paper
        sx={{ padding: 3, width: "100%", maxWidth: "1000px" }}
        elevation={2}
      >
        {" "}
        {/* Adjusted for responsiveness */}
        <Grid container spacing={2} alignItems="stretch">
          {" "}
          {/* alignItems stretch for full height */}
          {/* Left Grid item */}
          <Grid xs={12} md={6} item container direction="column" spacing={2}>
            <Grid>
              <TextField
                fullWidth
                label="Název skupiny"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Vyhledávání uživatelů"
                helperText="Vyhledávání pomocí přezdívky"
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            {/* User list here */}
            <Grid container direction="column" spacing={0.5}>
              {filteredUsers.map((user, index) => (
                <Grid>
                  {" "}
                  <Button key={index} onClick={() => onAdd(user)}>
                    {user.username}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Right Grid item */}
          <Grid xs={12} md={6} container direction="column" spacing={2}>
            <Grid>
              <Typography paddingLeft={1}>
                {groupName || "Název skupiny"}
              </Typography>
            </Grid>
            <Grid>
              <Divider />
            </Grid>
            {/* Selected users list here */}
            <Grid container direction="column" spacing={0.5}>
              {selectedUsers.map((user, index) => (
                <Grid>
                  <Button
                    key={index}
                    onClick={() => onRemove(user)}
                    color="error"
                  >
                    {user.username}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Button variant={"contained"} onClick={createGroup}>
        Vytvořit
      </Button>
    </FullScreenColorContainer>
  );
};

export default GroupCreationScreen;
