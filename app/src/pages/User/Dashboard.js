import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button, Collapse } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  // Funktion zum Schließen des Menüs
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Container fluid className={`mt-5 mb-5 ${styles.board}`}>
      <h4 className="headline mb-5 mt-3">User Dashboard</h4>
      <Row>
        {/* Sidebar für größere Bildschirme */}
        <Col md={2} className={`d-none d-md-block bg-dark`}>
          <Nav className={`flex-column`}>
            <Nav.Link as={Link} to="profile">Mein Profil</Nav.Link>
            <Nav.Link as={Link} to="events">Meine Events</Nav.Link>
          </Nav>
        </Col>

        {/* Sidebar für mobile Geräte */}
        <Col md={2} className="d-md-none">
          <Button 
            variant="outline-secondary" 
            className='mt-2'
            onClick={() => setOpen(!open)} 
            aria-controls="sidebar-collapse"
            aria-expanded={open}
          >
            Menü
          </Button>
          <Collapse in={open}>
            <div id="sidebar-collapse" className="mt-2">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="profile" onClick={handleLinkClick}>Mein Profil</Nav.Link>
                <Nav.Link as={Link} to="events" onClick={handleLinkClick}>Meine Events</Nav.Link>
              </Nav>
            </div>
          </Collapse>
        </Col>

        {/* Hauptinhalt */}
        <Col md={10} className='mb-3'>
          
          {/* Hier wird der Inhalt der Unterrouten angezeigt */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
