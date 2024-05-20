import { IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/CustomDrawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
      const groupUsersIds = group.users.map((user) => user.id);
      const fetchedUsers = await fetchDocumentsByIds("users", groupUsersIds);
      const updatedGroupUsers = fetchedUsers.map((user) => ({
        ...user,
        color: group.users.find((groupUser) => groupUser.id === user.id)?.color,
        visible: true,
      }));
      console.log(updatedGroupUsers);
      setGroupUsers(updatedGroupUsers);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // Funkce pro zpracování dat uživatelů do dat kalendáře
  const processGroupUsersDates = () => {
    const groupUsersDates = groupUsers.flatMap((user) => {
      if (user.visible && user.dates) {
        return convertFirestoreTimestampsToDates(user.dates).map((date) => ({
          ...date,
          color: user.color,
          name: user.username,
        }));
      }
      return [];
    });
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

  function handleUserVisibilityChange(id) {
    const updatedUsers = groupUsers.map((user) => {
      if (user.id === id) {
        user.visible = !user.visible;
      }
      return user;
    });
    setGroupUsers(updatedUsers);
  }

  return (
    <FullScreenColorContainer
      alignItems="center"
      justifyContent="flex-start"
      Drawer={<Drawer />}
      spacing={1}
    >
      <Typography variant="h4">{group.name}</Typography>
      <Typography>ID: {group.id}</Typography>
      <CustomCalendar dates={dates} />
      <Typography>Členové skupiny:</Typography>
      <Stack maxHeight={100}>
        {groupUsers.map((user) => {
          return (
            <Stack
              key={user.id}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                size="small"
                onClick={() => handleUserVisibilityChange(user.id)}
              >
                {user.visible ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
              <div
                style={{
                  backgroundColor: user.color || "grey",
                  width: "15px",
                  height: "15px",
                  borderRadius: "5px",
                }}
              ></div>
              <Typography>
                {user.firstName} {user.lastName} ({user.username})
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
