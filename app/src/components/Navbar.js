import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Stelle sicher, dass useNavigate hier importiert wird
import logo from '../images/logo.png';
import LoginModal from '../pages/Login/LoginPage';
import SignupModal from '../pages/Signup/SignupMordal';
import { logout } from '../api/auth';

const NavigationBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false); // Zustand für Navbar
  const navigate = useNavigate(); // Verwende useNavigate hier

  const handleLoginShow = () => {
    setShowLoginModal(true);
    setIsNavExpanded(false); // Schließe die Navbar
  };
  const handleLoginClose = () => setShowLoginModal(false);

  const handleSignupShow = () => {
    setShowSignupModal(true);
    setIsNavExpanded(false); // Schließe die Navbar
  };
  const handleSignupClose = () => setShowSignupModal(false);

  const handleLogout = async () => {
    try {
      await logout(); // Aufruf der logout-Funktion
      // Optional: Token aus dem LocalStorage entfernen
      localStorage.removeItem('token');
      navigate('/'); // Weiterleitung nach dem Logout
      setIsNavExpanded(false); // Schließe die Navbar
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  };

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded); // Toggle Navbar
  };

  return (
    <>
      <Navbar
        className="bg-nav fixed-top"
        variant="dark"
        expand="lg"
        expanded={isNavExpanded} // Steuerung der Navbar
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => setIsNavExpanded(false)}>
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="me-3" as={Link} to="/" onClick={() => setIsNavExpanded(false)}>
                <i className="bi bi-house-door p-1"></i>Home
              </Nav.Link>
              <Nav.Link className="me-3" as={Link} to="#" onClick={() => setIsNavExpanded(false)}>
                <i className="bi bi-people p-1"></i>Profil
              </Nav.Link>
              <Nav.Link className="me-3" as={Link} to="/events" onClick={() => setIsNavExpanded(false)}>
                <i className="bi bi-calendar-event p-1"></i>Events
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as="button" onClick={handleLoginShow}>
                <i className="bi bi-box-arrow-in-left p-1"></i>Login
              </Nav.Link>
              <Nav.Link as="button" onClick={handleSignupShow}>
                <i className="bi bi-person-plus p-1"></i>Register
              </Nav.Link>
              <Nav.Link as="button" onClick={handleLogout}>
                <i className="bi bi-box-arrow-in-right p-1"></i>Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hier wird das LoginModal eingebunden */}
      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />

      {/* Hier wird das SignupModal eingebunden */}
      <SignupModal show={showSignupModal} handleClose={handleSignupClose} />
    </>
  );
};

export default NavigationBar;
