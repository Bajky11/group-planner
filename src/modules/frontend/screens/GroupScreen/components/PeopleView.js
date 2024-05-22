import { Box, IconButton, Stack, Typography } from "@mui/material";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { appStateAtom } from "../../../state/state";
import { useAtom } from "jotai";

const PeopleView = ({  handleUserVisibilityChange }) => {
  const [appState] = useAtom(appStateAtom);

  return (
    <Box>
      <Typography>Členové skupiny:</Typography>
      <Stack maxHeight={100}>
        {appState.selectedGroup.users.map((user) => {
          return (
            <Stack
              key={user.id}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                size="small"
                onClick={() => handleUserVisibilityChange(user.id)}
              >
                {user.visible ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
              <div
                style={{
                  backgroundColor: user.color || "grey",
                  width: "15px",
                  height: "15px",
                  borderRadius: "5px",
                }}
              ></div>
              <Typography>
                {user.firstName} {user.lastName} ({user.username})
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PeopleView;
