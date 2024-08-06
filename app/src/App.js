// App.js
import React from 'react'
import './styles/App.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Imprint from './pages/imprint'
import Policys from './pages/policys'
import Forumguidelines from './pages/forumguidelines'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container className="h-100">
          <Routes>
            {/* Hauptinhalt */}
            <Route
              path="/"
              element={
                <Row className="justify-content-center mt-5">
                  <Col md={8}>
                    <Card className="text-center mb-5">
                      <Card.Body>
                        <Card.Title className="headline">
                          Willkommen in der Ford Fiesta Community!
                        </Card.Title>
                        <Card.Text>
                          Eine spezialisierte Plattform für Besitzer und
                          Enthusiasten des Ford Fiesta (Modelljahr
                          11/2001–08/2008). Auf unserer Plattform kannst Du:
                        </Card.Text>
                        <ul className="text-start">
                          <li>
                            Events finden, die speziell für Dein Modell
                            organisiert sind.
                          </li>
                          <li>
                            Neue Events hinzufügen, um andere Fiesta-Fans
                            einzuladen.
                          </li>
                          <li>
                            Events bewerten und kommentieren, um Deine
                            Erfahrungen zu teilen.
                          </li>
                          <li>
                            An Auto-Treffen, Reparatur-Workshops und Ausfahrten
                            teilnehmen.
                          </li>
                        </ul>
                        <Button className="primary mb-3 mt-3" href="/events">
                          Jetzt Events entdecken
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              }
            />

            {/* Impressum-Seite */}
            <Route path="/imprint" element={<Imprint />} />

            {/* Datenschutz-Seite */}
            <Route path="/policys" element={<Policys />} />

            {/* Forum-Richtlinien-Seite */}
            <Route path="/forumguidelines" element={<Forumguidelines />} />

            {/* Weitere Routen können hier hinzugefügt werden */}
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
