import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set the initial authentication state

  // Define the logout function
  const handleLogout = () => {
    // Perform the logout actions (e.g., clear JWT, end user session)
    setIsLoggedIn(false); // Update the authentication state to false
  };
  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Admin />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/music" element={<Music />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
