import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ColorPicker from "react-pick-color";
import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { convertFirestoreTimestampsToDates } from "../functions/convertFirestoreTimestampsToDates";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useLocation } from "react-router-dom";

const GroupScreen = () => {
  const location = useLocation();
  const group = location.state?.group;
  const groupMembersIds = group.test.map((item) => item.id);
  const [groupUsers, setGroupUsers] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const users = await fetchDocumentsByIds("users", groupMembersIds);
        if (isMounted) {
          const usersWithColors = users.map((user) => {
            const colorObject = group.test.find((color) => color.id === user.id);
            return {
              ...user,
              color: colorObject ? colorObject.color : undefined,
            };
          });
          setGroupUsers(usersWithColors);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [groupMembersIds, group.test]); // Add the necessary dependencies here

  useEffect(() => {
    const groupUsersDates = groupUsers.flatMap((user) =>
      user.dates ? convertFirestoreTimestampsToDates(user.dates).map(date => ({ ...date, color: user.color })) : []
    );

    setInitialData(groupUsersDates);
  }, [groupUsers]); // React to changes in groupUsers only

  return (
    <FullScreenColorContainer
      alignItems={"center"}
      justifyContent={"center"}
      Drawer={<Drawer />}
      spacing={1}
    >
      <Typography variant="h4">{group.name}</Typography>
      <Typography>ID: {group.id}</Typography>
      <CustomCalendar dates={initialData} />
      <Typography>Členové skupiny:</Typography>
      {groupUsers.map((user, index) => (
        <Stack key={user.id} direction={"row"} spacing={1} alignItems={"center"}>
          <div style={{ backgroundColor: user.color || "grey", width: "10px", height: "10px" }}></div>
          <Typography>
            {user.firstName} {user.lastName} ({user.username})
          </Typography>
        </Stack>
      ))}
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
