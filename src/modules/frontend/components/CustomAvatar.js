import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "../state/state";

const CustomAvatar = () => {
  const [user] = useAtom(userAtom);
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1} pl={1}>
      <Avatar sx={{ width: 28, height: 28 }}>
        {user.firstName[0].toUpperCase()}
      </Avatar>
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
    </Stack>
  );
};

export default CustomAvatar;
