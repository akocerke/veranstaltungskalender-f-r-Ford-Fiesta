import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom'; // Outlet wird für die verschachtelten Routen verwendet
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h1 className="headline2 text-success text-lg-center mb-3 mt-3">Admin Dashboard</h1>
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3}>
          <Nav className="flex-column">
            
            <Nav.Link as={Link} to="users">Benutzerverwaltung</Nav.Link>
            <Nav.Link as={Link} to="violations">Verstöße</Nav.Link>
            <Nav.Link as={Link} to="comments">Kommentare</Nav.Link>
          </Nav>
        </Col>

        {/* Hauptinhalt, der dynamisch geändert wird */}
        <Col md={9}>
          <Outlet /> {/* Hier wird die entsprechende Admin-Seite (Users, Violations, Comments) gerendert */}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
