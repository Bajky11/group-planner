import { useEffect, useState } from "react";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { Typography } from "@mui/material";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useLocation } from "react-router-dom";

const GroupScreen = () => {
  const location = useLocation();
  const group = location.state?.group;
  const [groupUsers, setGroupUsers] = useState([]);

  // Assuming setGroups is defined in your component to update the state with fetched groups
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is still mounted

    const fetchUsers = async () => {
      try {
        const users = await fetchDocumentsByIds("users", group.users);
        if (isMounted) {
          setGroupUsers(users);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
        // Optionally handle the error by setting an error state, etc.
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Set isMounted to false when the component unmounts
    };
  }, []); // Dependency array includes user.groups

  console.log(group);
  return (
    <FullScreenColorContainer
      alignItems={"center"}
      justifyContent={"center"}
      Drawer={<Drawer />}
      spacing={1}
    >
      <Typography variant="h4">{group.name}</Typography>
      <Typography>ID: {group.id}</Typography>
      <CustomCalendar />
      <Typography>Členové skupiny:</Typography>
      {groupUsers.map((user) => {
        return (
          <Typography>
            {user.firstName} {user.lastName} ({user.username})
          </Typography>
        );
      })}
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
