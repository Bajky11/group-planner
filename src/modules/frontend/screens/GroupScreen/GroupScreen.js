import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import {
  appStateAtom,
  setSelectedGroupAtom,
  toggleVisibilityToGroupUserAtom,
} from "../../state/state";
import { useEffect, useState } from "react";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarView from "./components/CalendarView";
import Drawer from "../../components/CustomDrawer";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import FullScreenColorContainer from "../../containers/FullScreenColorContainer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoView from "./components/InfoView";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PeopleView from "./components/PeopleView";
import VotingView from "./components/VotingView";
import { convertFirestoreTimestampsToDates } from "../../functions/convertFirestoreTimestampsToDates";
import { fetchDocumentsByIds } from "../../../backend/fetchDocumentsByIds";
import { updateArrayFieldInDocument } from "../../../backend/updateArrayFieldInDocument";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import useSubscribeToFirestoreDocument from "../../hooks/useSubscribeToFirestoreDocument";
import { v4 as uuidv4 } from "uuid";

const GroupScreen = () => {
  const location = useLocation();
  const group = location.state?.group;
  //const [groupUsers, setGroupUsers] = useState([]);
  //const [dates, setDates] = useState([]);
  //const [possibleDates, setPossibleDates] = useState([]);
  const [ui, setUi] = useState("calendar");
  const [appState] = useAtom(appStateAtom);
  const [_, toggleVisibilityToGroupUser] = useAtom(
    toggleVisibilityToGroupUserAtom
  );

  const [, setSelectedGroup] = useAtom(setSelectedGroupAtom);

  const { data, loading, error } = useSubscribeToFirestoreDocument(
    "groups",
    group.id
  );

  function processPossibleDates(dates) {
    return dates.map((date) => {
      return {
        ...date,
        start: date.start.toDate(),
        end: date.end.toDate(),
      };
    });
  }

  async function processUsers(users) {
    // TODO: Process userIds by fetching all users by ids like in fetchGroupUsers
    try {
      const userIds = users.map((user) => user.id);
      const fetchedUsers = await fetchDocumentsByIds("users", userIds);
      const updatedUsers = fetchedUsers.map((user) => ({
        ...user,
        color: users.find((groupUser) => groupUser.id === user.id)?.color,
        visible: true,
      }));
      return updatedUsers;
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  useEffect(() => {
    const processGroupData = async (data) => {
      const selectedGroupData = {
        ...data,
        possibleDates: processPossibleDates(data.possibleDates),
        users: await processUsers(data.users),
      };

      setSelectedGroup(selectedGroupData);
    };

    if (data) {
      processGroupData(data);
    }
  }, [data]);

  function handleUserVisibilityChange(id) {
    appState.selectedGroup.users.map((user) => {
      if (user.id === id) {
        toggleVisibilityToGroupUser({
          userId: user.id,
          newValue: !user.visible,
        });
      }
      return user;
    });
  }

  function onPossibleDateChange(date) {
    const newPossibleDateObject = {
      id: uuidv4(),
      start: date.start,
      end: date.end,
      users: [],
    };
    //setPossibleDates((prev) => [...prev, newPossibleDateObject]);
    updateArrayFieldInDocument("groups", group.id, "possibleDates", [
      newPossibleDateObject,
    ]);
  }

  const handleUiChange = (event, newUi) => {
    newUi && setUi(newUi);
  };

  const renderView = () => {
    if (loading || appState.selectedGroup === null) {
      return "loading...";
    }
    if (error) {
      return error;
    }

    switch (ui) {
      case "voting":
        return <VotingView group={group} />;
      case "calendar":
        return <CalendarView onPossibleDateChange={onPossibleDateChange} />;
      case "people":
        return (
          <PeopleView handleUserVisibilityChange={handleUserVisibilityChange} />
        );
      case "info":
        return <InfoView />;
      default:
        return null;
    }
  };

  return (
    <FullScreenColorContainer
      alignItems="center"
      justifyContent="flex-start"
      Drawer={<Drawer />}
      spacing={1}
    >
      <Typography variant="h4">{group.name}</Typography>
      <Typography>ID:{group.id}</Typography>

      <ToggleButtonGroup value={ui} exclusive onChange={handleUiChange}>
        <ToggleButton value="voting">
          <EventAvailableOutlinedIcon />
        </ToggleButton>
        <ToggleButton value="calendar">
          <CalendarMonthOutlinedIcon />
        </ToggleButton>
        <ToggleButton value="people">
          <PeopleOutlineOutlinedIcon />
        </ToggleButton>
        <ToggleButton value="info">
          <InfoOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      {renderView()}
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
