// components/Footer.js
import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h5>Kontakt</h5>
            <hr></hr>
            <p className="text-white-50">Email: info@fiesta-events.de</p>
            <p className="text-white-50">Telefon: 01234 567890</p>
          </Col>
          <Col md={4}>
            <h5 className="text-center">Navigation</h5>
            <hr></hr>
            <Nav className="flex-column text-center">
              <Nav.Link href="/" className="text-white-50">
                Home
              </Nav.Link>
              <Nav.Link href="/events" className="text-white-50">
                Events
              </Nav.Link>
              <Nav.Link href="/contact" className="text-white-50">
                Kontakt
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5 className="text-center">Rechtliches</h5>
            <hr></hr>
            <Nav className="flex-column text-center">
              <Nav.Link as={Link} to="/imprint" className="text-white-50">
                Impressum
              </Nav.Link>
              <Nav.Link as={Link} to="/policys" className="text-white-50">
                Datenschutz
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="forumguidelines"
                className="text-white-50"
              >
                Forum-Richtlinien
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-5">
          <hr></hr>
          <Col className="text-center text-white-50 mt-3">
            <p>
              &copy; {currentYear} Veranstaltungskalender für Ford Fiesta. Alle
              Rechte vorbehalten.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
