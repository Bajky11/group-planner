import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import GroupScreen from "./modules/frontend/screens/GroupScreen";
import LoginScreen from "./modules/frontend/screens/LoginScreen";
import MainScreen from "./modules/frontend/screens/MainScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/group" element={<GroupScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
