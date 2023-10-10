import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./home/HomePage";

//
import ProjectsPage from "./projects/ProjectsPage";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
