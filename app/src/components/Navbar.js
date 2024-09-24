import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import LoginModal from '../pages/Login/LoginPage'
import SignupModal from '../pages/Signup/SignupMordal'
import { logout } from '../api/auth'

const NavigationBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const navigate = useNavigate()

  // Benutzerrollen aus dem localStorage abrufen
  const token = localStorage.getItem('token')
  let userRole = null

  // Falls Token vorhanden ist, Rolle dekodieren
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      userRole = payload.role
    } catch (e) {
      console.error('Fehler beim Dekodieren des Tokens:', e)
    }
  }

  const handleLoginShow = () => {
    setShowLoginModal(true)
    setIsNavExpanded(false)
  }

  const handleLoginClose = () => setShowLoginModal(false)

  const handleSignupShow = () => {
    setShowSignupModal(true)
    setIsNavExpanded(false)
  }

  const handleSignupClose = () => setShowSignupModal(false)

  const handleLogout = async () => {
    try {
      await logout() // Aufruf der logout-Funktion
      localStorage.removeItem('token') // Entferne den Token aus dem LocalStorage
      navigate('/') // Weiterleitung nach dem Logout
      setIsNavExpanded(false) // Schließe die Navbar
    } catch (error) {
      console.error('Fehler beim Logout:', error)
    }
  }

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded)
  }

  return (
    <>
      <Navbar
        className="bg-nav fixed-top"
        variant="dark"
        expand="lg"
        expanded={isNavExpanded}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => setIsNavExpanded(false)}
          >
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                className="me-3"
                as={Link}
                to="/"
                onClick={() => setIsNavExpanded(false)}
              >
                <i className="bi bi-house-door p-1"></i>Home
              </Nav.Link>
              {userRole === 'admin' && (
                <Nav.Link
                  className="me-3"
                  as={Link}
                  to="/admin/dashboard"
                  onClick={() => setIsNavExpanded(false)}
                >
                  <i className="bi bi-gear p-1"></i>Admin Dashboard
                </Nav.Link>
              )}
              {userRole === 'user' && (
                <Nav.Link
                  className="me-3"
                  as={Link}
                  to="/users/dashboard"
                  onClick={() => setIsNavExpanded(false)}
                >
                  <i className="bi bi-person p-1"></i>User Dashboard
                </Nav.Link>
              )}
              {(userRole === 'admin' || userRole === 'user') && (
              <Nav.Link
                className="me-3"
                as={Link}
                to="/create-event"
                onClick={() => setIsNavExpanded(false)}
              >
                <i className="bi bi-plus-circle p-1"></i>Event erstellen
              </Nav.Link>
            )}
              <Nav.Link
                className="me-3"
                as={Link}
                to="/events"
                onClick={() => setIsNavExpanded(false)}
              >
                <i className="bi bi-calendar-event p-1"></i>Events
              </Nav.Link>
              
            </Nav>
           
            <Nav>
              {token ? (
                <Nav.Link as="button" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-in-right p-1"></i>Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as="button" onClick={handleLoginShow}>
                    <i className="bi bi-box-arrow-in-left p-1"></i>Login
                  </Nav.Link>
                  <Nav.Link as="button" onClick={handleSignupShow}>
                    <i className="bi bi-person-plus p-1"></i>Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
      <SignupModal show={showSignupModal} handleClose={handleSignupClose} />
    </>
  )
}

export default NavigationBar
