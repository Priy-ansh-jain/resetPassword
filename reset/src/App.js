import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reset from "./Auth/form/Reset";

function App() {
  return (
    <Router>
      <Routes>
        {/* Your other routes go here */}
        <Route path="/api/passwordReset/:token" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
