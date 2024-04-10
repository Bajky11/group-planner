import Drawer from "../components/Drawer";
import { Stack } from "@mui/material";

const FullScreenColorContainer = ({
  alignItems = "center",
  justifyContent = "center",
  Drawer,
  children,
}) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      {Drawer}

      <Stack
        sx={{ flexGrow: 1, height: "100%" }}
        alignItems={alignItems}
        justifyContent={justifyContent}
        direction={"column"}
      >
        {children}
      </Stack>
    </div>
  );
};

export default FullScreenColorContainer;
