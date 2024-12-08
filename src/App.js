// import Dashboard from "./Screens/Dashboard";
// import LoginPage from "./Screens/Login";
// function App() {
//   return (
//     <LoginPage />
//     // <Dashboard />
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Screens/Dashboard"; // Your Dashboard component
import LoginPage from "./Screens/Login"; // Your Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
