import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "./context/DataContext";
import "./App.css";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./components/LoginForm";
import Events from "./pages/Events";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import Padding from "./components/Padding";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated, logoutUser, authUser } = useData();

  const handleLogout = () => {
    logoutUser();
  };

  interface ProtectedRouteProps {
    children: React.ReactNode;
  }

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login onLoginSuccess={(credentials) => authUser(credentials)} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <Padding>
                <Events onHome={false} />
              </Padding>
            }
          />
          <Route
            path="/music"
            element={
              <Padding>
                <Music />
              </Padding>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
