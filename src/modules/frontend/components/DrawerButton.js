import { Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const DrawerButton = ({ title, onClick, linkTo, group }) => {
  return (
    <Button component={Link} to={linkTo} state={{ group }} onClick={onClick} style={{ justifyContent: "flex-start" }}>
      <Typography>{title}</Typography>
    </Button>
  );
};

export default DrawerButton;
