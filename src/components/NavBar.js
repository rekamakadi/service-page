import { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const renderNavLinks = () => {
    const links = [
      { href: "#home", label: "Home", value: "home" },
      { href: "#services", label: "Services", value: "services" },
      { href: "#projects", label: "Projects", value: "projects" },
      { href: "#contact", label: "Contact", value: "contact" },
    ];

    return links.map((link) => (
      <Nav.Link
        key={link.value}
        href={link.href}
        className={activeLink === link.value ? "active navbar-link" : "navbar-link"}
        onClick={() => onUpdateActiveLink(link.value)}
      >
        {link.label}
      </Nav.Link>
    ));
  };

  return (
    <Router>
      <div className={`sidebar${isSidebarOpen ? " open" : ""}`}>
        <Button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Menu"}
        </Button>
        <div className="sidebar-content">
          <Navbar.Brand href="/service-page/" className="sidebar-brand">
            <img src={`${process.env.PUBLIC_URL}/sdv-LOGO-03.svg`} alt="Logo" />
          </Navbar.Brand>
          <Nav className="flex-column">
            {renderNavLinks()}
          </Nav>
        </div>
      </div>
    </Router>
  );
};
