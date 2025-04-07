import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ComposeMail from "./pages/ComposeMail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/mailbox" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
