import { Divider, Paper, Stack, Typography } from "@mui/material";
import { defaultUserObject, userAtom } from "../state/state";
import { useEffect, useState } from "react";

import CustomAvatar from "./CustomAvatar";
import DrawerButton from "./DrawerButton";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useAtom } from "jotai";

const Drawer = () => {
  const [user, setUser] = useAtom(userAtom);
  const [groups, setGroups] = useState([]);

  // Assuming setGroups is defined in your component to update the state with fetched groups
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is still mounted

    const fetchGroups = async () => {
      if (user.groups && user.groups.length > 0) {
        try {
          const groups = await fetchDocumentsByIds("groups", user.groups);
          if (isMounted) {
            setGroups(groups);
          }
        } catch (error) {
          console.error("Error fetching groups:", error);
          // Optionally handle the error by setting an error state, etc.
        }
      }
    };

    fetchGroups();

    return () => {
      isMounted = false; // Set isMounted to false when the component unmounts
    };
  }, [user.groups]); // Dependency array includes user.groups

  const handleLogout = () => {
    console.log("logout");
    setUser(defaultUserObject);
  };

  return (
    <Stack
      component={Paper}
      elevation={2}
      width={150}
      height={"100%"}
      spacing={1}
      padding={1}
    >
      <CustomAvatar />
      <Divider />
      <DrawerButton title={"Můj kalendář"} linkTo={"/main"} />
      <DrawerButton title={"Odhlásit"} onClick={handleLogout} linkTo={"/"} />
      <Divider />
      <Typography pl={1}>Skupiny</Typography>
      <DrawerButton title={"Nová skupina"} linkTo={"/groupcreation"} />
      <DrawerButton title={"Připojit se"} linkTo={"/groupjoin"} />
      <Divider />
      {groups && groups.map(group => {
        return <DrawerButton title={group.name} group={group} linkTo={"/group"} />
      })}
    </Stack>
  );
};

export default Drawer;
