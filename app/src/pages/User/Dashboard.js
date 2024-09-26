import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h1 className="headline2 text-info text-lg-center mb-3 mt-3">User Dashboard</h1>
      <Row>
        {/* Sidebar für alle Bildschirmgrößen sichtbar */}
        <Col md={3}>
          <h5 className="mt-4 text-info">User Bereich</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="statistics" className={styles.navLink}>
              <i className={`bi bi-graph-up-arrow ${styles.sidebarIcon}`}></i> Meine Statistiken
            </Nav.Link>
            <Nav.Link as={Link} to="profile" className={styles.navLink}>
              <i className={`bi bi-gear ${styles.sidebarIcon}`}></i> Mein Profil
            </Nav.Link>
            <Nav.Link as={Link} to="events" className={styles.navLink}>
              <i className={`bi bi-calendar ${styles.sidebarIcon}`}></i> Meine Events
            </Nav.Link>
          </Nav>
        </Col>

        {/* Hauptinhalt für Profil und Events */}
        <Col md={9} className="mb-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
