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
import AdminDashboard from './pages/Admin/Dashboard'
import AdminStatistic from './pages/Admin/Statistic'
import AdminEvents from './pages/Admin/Events'
import AdminUsers from './pages/Admin/Users'
import AdminViolations from './pages/Admin/Validation'
import AdminComments from './pages/Admin/Comments'
import AdminProfile from './pages/Admin/UserProfile '
import AdminSeineEvents from './pages/Admin/UserEvents'
import Events from './pages/Events/Events'
import CreateEvent from './pages/Events/CreateEvent'
import Contact from './pages/Contact/contact'
import UserDashboard from './pages/User/Dashboard'
import UserEvents from './pages/User/UserEvents'
import UserProfile from './pages/User/UserProfile '

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

            {/* Footer */}
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/policys" element={<Policys />} />
            <Route path="/forumguidelines" element={<Forumguidelines />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              {/* Verschachtelte Admin-Routen */}
              <Route path='meine-events' element={<AdminSeineEvents/>}/>
              <Route path='mein-profil' element={<AdminProfile/>}/>
              <Route path='events' element={<AdminEvents/>}/>
              <Route path="users" element={<AdminUsers />} />
              <Route path="violations" element={<AdminViolations />} />
              <Route path="comments" element={<AdminComments />} />
              <Route path="statistic" element={<AdminStatistic />} />
            </Route>
            
            {/* User-Bereich */}
            <Route path="/users/dashboard" element={<UserDashboard />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="events" element={<UserEvents />} />
            </Route>
            {/* Events */}
            <Route path="/events" element={<Events />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
