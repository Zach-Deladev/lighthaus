import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

// Define the interface for the props
interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

function Header({ isAuthenticated, onLogout }: HeaderProps) {
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 30;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      className={`${styles.navbg} ${navBackground ? "bg-dark" : ""}`}
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand as={Link} to="/" className={styles.brand}>
        <img src={logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/" className={styles.pagename}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/events" className={styles.pagename}>
            Events
          </Nav.Link>
          <Nav.Link as={Link} to="/music" className={styles.pagename}>
            Music
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className={styles.pagename}>
            Contact
          </Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/admin" className={styles.pagename}>
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={onLogout} className={styles.pagename}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
