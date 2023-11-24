import { useEffect, useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./components/LoginForm";
import Events from "./pages/Events";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false); // Set the initial authentication state

  useEffect(() => {
    console.log("Is Logged In State: ", isAuthenticated); // Log whenever isAuthenticated state changes
  }, [isAuthenticated]);

  const handleLogout = () => {
    setisAuthenticated(false); // Update the authentication state to false
    console.log("Logged out"); // Log when user logs out
  };

  const handleLoginSuccess = () => {
    setisAuthenticated(true);
    console.log("Logged in successfully"); // Log when user logs in successfully
  };

  interface ProtectedRouteProps {
    children: ReactNode;
  }

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/events" element={<Events />}></Route>
          <Route path="/music" element={<Music />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
