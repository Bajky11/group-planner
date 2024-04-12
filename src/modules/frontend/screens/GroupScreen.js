import { useEffect, useState } from "react";

import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { Typography } from "@mui/material";
import { convertFirestoreTimestampsToDates } from "../functions/convertFirestoreTimestampsToDates";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useLocation } from "react-router-dom";

const GroupScreen = () => {
  const location = useLocation();
  const group = location.state?.group;
  const [groupUsers, setGroupUsers] = useState([]);
  const [initialData, setInitialData] = useState([]);

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

  useEffect(() => {
    
    // Předpokládám, že každý uživatel má vlastnost `dates`, která je polem datumů
    const groupUsersDates = groupUsers.map(user => convertFirestoreTimestampsToDates(user.dates) || []).flat();
    setInitialData(groupUsersDates)
    console.log(groupUsersDates); // Tento řádek vypíše nové pole s daty ze všech uživatelů
  }, [groupUsers]);

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
      <CustomCalendar initialData={initialData} />
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