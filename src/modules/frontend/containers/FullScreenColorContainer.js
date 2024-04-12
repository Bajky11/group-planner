import Drawer from "../components/Drawer";
import { Stack } from "@mui/material";

const FullScreenColorContainer = ({
  alignItems = "center",
  justifyContent = "center",
  Drawer,
  children,
  spacing,
}) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      {Drawer}

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