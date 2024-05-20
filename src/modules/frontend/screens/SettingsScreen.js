import { Button } from "@mui/material";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import useInstallAppPrompt from "../hooks/useInstallAppPromt";

const SettingsScreen = () => {
  const handleInstallApp = () => {
    handleInstallClick()
  };
  const { showInstallPrompt, handleInstallClick } = useInstallAppPrompt();

  return (
    <FullScreenColorContainer
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      spacing={2}
    >
      <Button variant="contained" onClick={handleInstallApp}>
        Přidat aplikaci na plochu
      </Button>
    </FullScreenColorContainer>
  );
};

export default SettingsScreen;
