import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import Layout from "./layout";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  </StrictMode>
);