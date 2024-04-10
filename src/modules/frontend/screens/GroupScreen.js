import CustomCalendar from "../components/CustomCalendar";
import Drawer from "../components/Drawer";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";

const GroupScreen = () => {
  return (
    <FullScreenColorContainer alignItems={"center"} justifyContent={"center"} Drawer={<Drawer />}>
        Skupinový kalendář
      <CustomCalendar />
    </FullScreenColorContainer>
  );
};

export default GroupScreen;
