import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Collapse,
  Badge,
} from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import { getUserDashboard } from '../../api/users' // Importiere die Funktion
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState(null) // Zustand für die Dashboard-Daten
  const [error, setError] = useState(null) // Zustand für Fehlerbehandlung

  // Effekt zum Abrufen der Dashboard-Daten
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getUserDashboard()
        setDashboardData(data)
      } catch (error) {
        console.error('Fehler beim Abrufen der Dashboard-Daten:', error)
        setError('Fehler beim Laden der Dashboard-Daten.')
      }
    }

    fetchDashboardData()
  }, [])

  // Funktion zum Schließen des Menüs
  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h1 className="headline2 text-info text-lg-center mb-3 mt-3">User Dashboard</h1>
      <Row>
        {/* Sidebar für größere Bildschirme */}
        <Col md={2} className={`d-none d-md-block bg-dark`}>
          <Nav className={`flex-column`}>
            <Nav.Link as={Link} to="profile" onClick={handleLinkClick}>
              Mein Profil
            </Nav.Link>
            <Nav.Link as={Link} to="events" onClick={handleLinkClick}>
              Meine Events
            </Nav.Link>
          </Nav>
        </Col>

        {/* Sidebar für mobile Geräte */}
        <Col md={2} className="d-md-none">
          <Button
            variant="outline-secondary"
            className="mt-2"
            onClick={() => setOpen(!open)}
            aria-controls="sidebar-collapse"
            aria-expanded={open}
          >
            Menü
          </Button>
          <Collapse in={open}>
            <div id="sidebar-collapse" className="mt-2 rounded">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="profile" onClick={handleLinkClick}>
                  Mein Profil
                </Nav.Link>
                <Nav.Link as={Link} to="events" onClick={handleLinkClick}>
                  Meine Events
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>
        </Col>

        {/* Hauptinhalt */}
        <Col md={10} className="mb-3">
          {/* Dezent zentrierte Übersicht - Fester Bestandteil des Dashboards */}
          {error && <div className="alert alert-danger">{error}</div>}
          {dashboardData && (
            <div className={`mb-4 p-3 ${styles.overviewContainer}`}>
              <div className="d-flex justify-content-around mt-3 w-25">
                <Badge bg="primary" className="me-2 bg-opacity-50">
                  Events: {dashboardData.events.length}
                </Badge>
                <Badge bg="success" className="me-2 bg-opacity-50">
                  Bewertungen: {dashboardData.ratings.length}
                </Badge>
                <Badge bg="info" className="me-2 bg-opacity-50">
                  Kommentare: {dashboardData.comments.length}
                </Badge>
                <Badge bg="danger" className="me-2 bg-opacity-50">
                  Verstöße: {dashboardData.violations.length}
                </Badge>
              </div>
            </div>
          )}

          {/* Hier wird der Inhalt der Unterrouten angezeigt */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
