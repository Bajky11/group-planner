import CustomCalendar from "../../../components/CustomCalendar";
import { appStateAtom } from "../../../state/state";
import { convertFirestoreTimestampsToDates } from "../../../functions/convertFirestoreTimestampsToDates";
import { useAtom } from "jotai";

const CalendarView = ({ onPossibleDateChange }) => {
  const [appState] = useAtom(appStateAtom);

  function processUserDates(users) {
    const userDates = users.flatMap((user) => {
      if (user.visible && user.dates) {
        return convertFirestoreTimestampsToDates(user.dates).map((date) => ({
          ...date,
          color: user.color,
          name: user.username,
        }));
      }
      return [];
    });
    return userDates;
  }

  return (
    <CustomCalendar
      dates={processUserDates(appState.selectedGroup.users)}
      onValueChange={(value) => onPossibleDateChange(value)}
      possibleDates={appState.selectedGroup.possibleDates}
    />
  );
};

export default CalendarView;
