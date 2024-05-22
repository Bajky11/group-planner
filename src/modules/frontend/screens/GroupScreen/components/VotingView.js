import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { appStateAtom, userAtom } from "../../../state/state";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { formatDate } from "../../../functions/formatDate";
import { updatePossibleDateUsers } from "../../../../backend/queries/updatePossibleDateUsers";
import { useAtom } from "jotai";
import { useState } from "react";

const VotingView = ({ group }) => {
  const [user] = useAtom(userAtom);
  const [edit, setEdit] = useState(false);
  const [appState] = useAtom(appStateAtom);

  function handleDateClick(dateId) {
    updatePossibleDateUsers(group.id, dateId, user.id);
  }
  return appState.selectedGroup.possibleDates.map((date, index) => {
    const loggedUserSubscribedToDate = date.users.includes(user.id);

    return (
      <Stack
        key={index}
        bgcolor="secondary.light"
        py={1.0}
        px={1.5}
        borderRadius={6}
        component={Paper}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton onClick={() => handleDateClick(date.id)}>
            {loggedUserSubscribedToDate ? (
              <CheckCircleOutlinedIcon />
            ) : (
              <CircleOutlinedIcon />
            )}
          </IconButton>
          <Typography minWidth={160}>
            {`${formatDate(date.start)} - ${formatDate(date.end)}`}
          </Typography>
          <Divider orientation="vertical" />
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          {edit && (
            <Box>
              <IconButton>
                <DeleteOutlinedIcon />
              </IconButton>
              <IconButton>
                <CheckOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </Stack>
        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: -5, right: edit ? 100 : 0 }}>
            <AvatarGroup
              total={date.users.length}
              max={8}
              spacing={4}
              sx={{
                "& .MuiAvatar-root": {
                  width: 16,
                  height: 16,
                  fontSize: 10,
                },
              }}
            >
              {date.users.map((userId, index) => {
                const user = appState.selectedGroup.users.find(
                  (u) => u.id === userId
                );
                return (
                  <Tooltip key={index} title={user.username}>
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Tooltip>
                );
              })}
            </AvatarGroup>
          </Box>
        </Box>
      </Stack>
    );
  });
};

export default VotingView;
