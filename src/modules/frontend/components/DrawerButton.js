import { Paper, Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const DrawerButton = ({ title, onClick, linkTo }) => {
  return (
    <Link to={linkTo}>
      <Stack component={Paper} padding={1} onClick={onClick}>
        <Typography>{title}</Typography>
      </Stack>
    </Link>
  );
};

export default DrawerButton;
