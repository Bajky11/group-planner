import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue'; // Importujte barvy dle potřeby
import GroupCreationScreen from "./modules/frontend/screens/GroupCreationScreen";
import GroupJoinScreen from "./modules/frontend/screens/GroupJoinScreen";
import GroupScreen from "./modules/frontend/screens/GroupScreen";
import LoginScreen from "./modules/frontend/screens/LoginScreen";
import MainScreen from "./modules/frontend/screens/MainScreen";
import LandingPage from "./modules/frontend/screens/LandingPage";
import { useMediaQuery } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Tmavě modrá připomínající noční oblohu
    },
    secondary: {
      main: '#FF8F00', // Teplá oranžová připomínající oheň
    },
    background: {
      default: '#E0E0E0', // Světlá zelená pro pozadí (může se lišit podle vašich preferencí)
    },
    text: {
      //primary: '#FFFFFF', // Bílá pro hlavní text
      secondary: '#000000', // Černá pro sekundární text
    },
    action: {
      active: '#6D6D6D', // Šedá pro aktivní prvky
      hover: '#EEEEEE', // Světlá šedá pro hover efekty
      selected: '#FFD180', // Světlá oranžová pro vybrané prvky
    },
    // Můžete přidat další vlastní barvy
  },
});

function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={isSmallScreen ? <LoginScreen/> : <LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/group" element={<GroupScreen />} />
          <Route path="/groupcreation" element={<GroupCreationScreen />} />
          <Route path="/groupjoin" element={<GroupJoinScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
