import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom' // Outlet wird für die verschachtelten Routen verwendet
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h1 className="headline2 text-success text-lg-center mb-3 mt-3">
        Admin Dashboard
      </h1>
      <Row>
        <Col md={3}>
          {/* Admin-spezifische Kategorien */}
          <h5 className="mt-4 text-color">Admin Bereich</h5>
          <Nav className="flex-column mb-4">
          <Nav.Link as={Link} to="statistic">
              Statistik
            </Nav.Link>
            <Nav.Link as={Link} to="events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="users">
              Benutzer
            </Nav.Link>
            <Nav.Link as={Link} to="violations">
              Verstöße
            </Nav.Link>
            <Nav.Link as={Link} to="comments">
              Kommentare
            </Nav.Link>
          </Nav>

          {/* Benutzer-spezifische Kategorien */}
          <h5 className="mt-4 text-color">Benutzer Bereich</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="meine-events">
              Meine Events
            </Nav.Link>
            <Nav.Link as={Link} to="mein-profil">
              Mein Profil
            </Nav.Link>
          </Nav>
        </Col>

        {/* Hauptinhalt, der dynamisch geändert wird */}
        <Col md={9}>
          <Outlet />{' '}
          {/* Hier wird die entsprechende Admin-Seite (Users, Violations, Comments) gerendert */}
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
