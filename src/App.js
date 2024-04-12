import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import GroupCreationScreen from "./modules/frontend/screens/GroupCreationScreen";
import GroupJoinScreen from "./modules/frontend/screens/GroupJoinScreen";
import GroupScreen from "./modules/frontend/screens/GroupScreen";
import LoginScreen from "./modules/frontend/screens/LoginScreen";
import MainScreen from "./modules/frontend/screens/MainScreen";

function App() {
  return (
    //<Router basename="/group-planner">
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/group" element={<GroupScreen />} />
        <Route path="/groupcreation" element={<GroupCreationScreen />} />
        <Route path="/groupjoin" element={<GroupJoinScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
