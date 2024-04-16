import CustomDrawer from "../components/CustomDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../state/state";

const FullScreenColorContainer = ({
  alignItems = "center",
  justifyContent = "center",
  children,
  spacing,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <CustomDrawer open={drawerOpen} toggle={toggleDrawer} />
      {!drawerOpen && user.id && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute", // Absolutní pozicování vzhledem k nejbližšímu relativně pozicovanému předku
            top: 0, // Na vrchu kontejneru
            left: 0, // Na levé straně kontejneru
            zIndex: 1201, // Zajistěte, že bude nad ostatními prvkami (drawer má obvykle zIndex okolo 1200)
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Stack
        sx={{ flexGrow: 1, height: "100%" }}
        alignItems={alignItems}
        justifyContent={justifyContent}
        direction={"column"}
        spacing={spacing}
      >
        {children}
      </Stack>
    </div>
  );
};

export default FullScreenColorContainer;
