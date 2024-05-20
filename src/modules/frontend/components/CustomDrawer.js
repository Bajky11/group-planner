import {
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { defaultUserObject, userAtom } from "../state/state";
import { useEffect, useState } from "react";

import CustomAvatar from "./CustomAvatar";
import DrawerButton from "./DrawerButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { fetchDocumentsByIds } from "../../backend/fetchDocumentsByIds";
import { useAtom } from "jotai";

const CustomDrawer = ({ open, toggle }) => {
  const [user, setUser] = useAtom(userAtom);
  const [groups, setGroups] = useState([]);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
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
    setUser(defaultUserObject);
    navigate("/");
  };

  return (
    <Drawer
      open={open}
      variant={isLargeScreen ? "permanent" : "temporary"}
      onClose={toggle}
      ModalProps={{
        keepMounted: true, // Better performance on mobile devices.
      }}
      sx={{ width: "150px" }}
    >
      {user.id && <CustomAvatar />}
      <Divider />
      <Stack direction={"row"}>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>

        <IconButton component={Link} to={"/settings"}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <DrawerButton title={"Můj kalendář"} linkTo={"/main"} />
      <Divider />
      <Typography pl={1}>Skupiny</Typography>
      <DrawerButton title={"Nová skupina"} linkTo={"/groupcreation"} />
      <DrawerButton title={"Připojit se"} linkTo={"/groupjoin"} />
      <Divider />
      {groups &&
        groups.map((group, index) => (
          <DrawerButton
            key={index}
            title={group.name}
            group={group}
            linkTo={"/group"}
          />
        ))}
    </Drawer>
  );
};

export default CustomDrawer;
