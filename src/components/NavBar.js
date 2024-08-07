import { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`sidebar${isSidebarOpen ? " open" : ""}`}>
        <Button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Menu"}
        </Button>
        <div className="sidebar-content">
          <Navbar.Brand href="/" className="sidebar-brand">
            <img src={`${process.env.PUBLIC_URL}/sdv-LOGO-03.svg`} alt="Logo" />
          </Navbar.Brand>
          <Nav className="flex-column">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#services"
              className={
                activeLink === "services" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("services")}
            >
              Services
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className={
                activeLink === "contact" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("contact")}
            >
              Contact
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </Router>
  );
};
