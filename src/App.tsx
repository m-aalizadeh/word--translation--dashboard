import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PublicPage from "./pages/PublicPage";
import { TranslationProvider } from "./contexts/TranslationContext";

const App: React.FC = () => {
  return (
    <TranslationProvider>
      <Router>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="hover:text-gray-300">
              Public View
            </Link>
            <Link to="/dashboard" className="hover:text-gray-300">
              Management Dashboard
            </Link>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </TranslationProvider>
  );
};

export default App;
