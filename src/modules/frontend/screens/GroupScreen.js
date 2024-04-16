import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/CustomDrawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { convertFirestoreTimestampsToDates } from "../functions/convertFirestoreTimestampsToDates";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useLocation } from "react-router-dom";

const GroupScreen = () => {
  const location = useLocation();
  const group = location.state?.group;
  const [groupUsers, setGroupUsers] = useState([]);
  const [dates, setDates] = useState([]);

  // Funkce pro načtení uživatelů skupiny
  const fetchGroupUsers = async () => {
    try {
      const fetchedUsers = await fetchDocumentsByIds(
        "users",
        group.users.map((user) => user.id)
      );
      const usersWithColors = fetchedUsers.map((user) => ({
        ...user,
        color: group.users.find((groupUser) => groupUser.id === user.id)?.color,
      }));
      setGroupUsers(usersWithColors);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // Funkce pro zpracování dat uživatelů do dat kalendáře
  const processGroupUsersDates = () => {
    const groupUsersDates = groupUsers.flatMap((user) =>
      user.dates
        ? convertFirestoreTimestampsToDates(user.dates).map((date) => ({
          ...date,
          color: user.color,
        }))
        : []
    );

    setDates(groupUsersDates);
  };

  // useEffect pro načtení uživatelů
  useEffect(() => {
    if (group && group.users.length > 0) {
      fetchGroupUsers();
    }
  }, [group]);

  // useEffect pro zpracování dat uživatelů
  useEffect(() => {
    if (groupUsers.length > 0) {
      processGroupUsersDates();
    }
  }, [groupUsers]);

  return (
    <FullScreenColorContainer
      alignItems="center"
      justifyContent="center"
      Drawer={<Drawer />}
      spacing={1}
    >
      <Typography variant="h4">{group.name}</Typography>
      <Typography>ID: {group.id}</Typography>
      <CustomCalendar dates={dates} />
      <Typography>Členové skupiny:</Typography>
      <Stack maxHeight={100}>

        {groupUsers.map((user) => (
          <Stack key={user.id} direction="row" spacing={1} alignItems="center">
            <div
              style={{
                backgroundColor: user.color || "grey",
                width: "10px",
                height: "10px",
              }}
            ></div>
            <Typography>
              {user.firstName} {user.lastName} ({user.username})
            </Typography>
          </Stack>
        ))}
      </Stack>
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
