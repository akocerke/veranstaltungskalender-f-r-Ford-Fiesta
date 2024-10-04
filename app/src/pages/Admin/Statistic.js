import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { getAdminDashboard } from '../../api/admins' // Annahme: Diese Funktion existiert und holt Daten
import 'bootstrap-icons/font/bootstrap-icons.css' // Für Bootstrap Icons

const Statistic = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    eventCount: 0,
    violationCount: 0,
  })

  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      try {
        const data = await getAdminDashboard()
        setStats(data)
      } catch (error) {
        console.error('Fehler beim Abrufen der Statistik-Daten:', error)
        setError('Fehler beim Laden der Statistik-Daten.')
      }
    }

    fetchAdminDashboardData()
  }, [])

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Statistik
      </h5>

      {/* Fehlermeldung anzeigen, falls Daten nicht abgerufen werden konnten */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Statistiken anzeigen */}
      <Row className="g-4">
        {/* Benutzeranzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-people-fill"
                style={{ fontSize: '3rem', color: '#0d6efd' }}
              ></i>
              <Card.Title className="mt-3">Benutzer</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="primary" className="bg-opacity-50">
                    {stats.userCount}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Eventanzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-calendar-event-fill"
                style={{ fontSize: '3rem', color: '#198754' }}
              ></i>
              <Card.Title className="mt-3">Events</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="success" className="bg-opacity-50">
                    {stats.eventCount}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Verstoßanzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-exclamation-triangle-fill"
                style={{ fontSize: '3rem', color: '#dc3545' }}
              ></i>
              <Card.Title className="mt-3">Verstöße</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="danger" className="bg-opacity-50">
                    {stats.violationCount}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Statistic
