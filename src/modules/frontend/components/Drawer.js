import { Divider, Paper, Stack, Typography } from "@mui/material";

import CustomAvatar from "./CustomAvatar";
import DrawerButton from "./DrawerButton";

const Drawer = () => {
    
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
      <DrawerButton title={"Můj kalendář"} linkTo={"/main"} />
      <DrawerButton title={"Odhlásit"} linkTo={"/"} />
      <Divider />
      <Typography textAlign={"center"}>Skupiny</Typography>
      <DrawerButton title={"Házená"} linkTo={"/group"} />
      <DrawerButton title={"Seč"} linkTo={"/group"} />
    </Stack>
  );
};

export default Drawer;
