import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button, Collapse, Badge } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { getUserDashboard } from '../../api/users'; // Stelle sicher, dass der Pfad korrekt ist
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const data = await getUserDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Dashboard-Daten:', error);
      setError('Fehler beim Laden der Dashboard-Daten.');
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Daten beim ersten Laden abrufen

    // Optional: Setze ein Intervall für Auto-Refresh (z.B. alle 60 Sekunden)
    const intervalId = setInterval(fetchDashboardData, 60000);

    return () => clearInterval(intervalId); // Intervall bei Komponentenunmount bereinigen
  }, []);

  // Refresh-Button Handler
  const handleRefresh = () => {
    fetchDashboardData(); // Daten beim Klick auf den Refresh-Button abrufen
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h1 className="headline2 text-info text-lg-center mb-3 mt-3">User Dashboard</h1>
      <Row>
        {/* Sidebar für größere Bildschirme */}
        <Col md={2} className="d-none d-md-block bg-dark">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="profile" onClick={handleLinkClick} className={styles.navLink}>
              <i className={`bi bi-gear ${styles.sidebarIcon}`}></i> Mein Profil
            </Nav.Link>
            <Nav.Link as={Link} to="events" onClick={handleLinkClick} className={styles.navLink}>
              <i className={`bi bi-calendar ${styles.sidebarIcon}`}></i> Meine Events
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
                <Nav.Link as={Link} to="profile" onClick={handleLinkClick} className={`mt-2 ${styles.navLink}`}>
                  <i className={`bi bi-gear ${styles.sidebarIcon}`}></i> Mein Profil
                </Nav.Link>
                <Nav.Link as={Link} to="events" onClick={handleLinkClick} className={styles.navLink}>
                  <i className={`bi bi-calendar ${styles.sidebarIcon}`}></i> Meine Events
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>
        </Col>

        {/* Hauptinhalt */}
        <Col md={10} className="mb-3">
          {error && <div className="alert alert-danger">{error}</div>}
          {dashboardData && (
            <div className={`mb-4 p-3 ${styles.overviewContainer}`}>
              <div className="d-flex flex-wrap align-items-center mb-2">
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
                <div className="d-flex align-items-center ms-3">
                  <Button
                    variant="link"
                    onClick={handleRefresh}
                    className="p-0 text-decoration-none"
                    style={{ fontSize: '1.25rem' }}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                    <small className="ms-1">refresh</small>
                    <span className="visually-hidden">Aktualisieren</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
