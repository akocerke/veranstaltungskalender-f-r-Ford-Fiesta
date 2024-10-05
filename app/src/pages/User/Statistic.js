import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { getUserDashboard } from '../../api/users'

const Statistic = () => {
  const [stats, setStats] = useState({
    eventCount: 0,
    ratingCount: 0,
    commentCount: 0,
    totalViolations: 0,
    pendingViolations: 0,
    resolvedViolations: 0,
  })

  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        const data = await getUserDashboard()

        // Hier die Statistiken anpassen
        setStats({
          eventCount: data.events,
          ratingCount: data.ratings,
          commentCount: data.comments,
          totalViolations: data.violations.total || 0,
          pendingViolations: data.violations.pending || 0,
          resolvedViolations: data.violations.resolved || 0,
        })
      } catch (error) {
        console.error('Fehler beim Abrufen der Statistik-Daten:', error)
        setError('Fehler beim Laden der Statistik-Daten.')
      }
    }

    fetchUserDashboardData()
  }, [])

  return (
    <Container className="mt-3 mb-3">
      <h4 className={`headline2 text-info mt-3`}>Meine Statistiken</h4>

      {/* Fehlermeldung anzeigen, falls Daten nicht abgerufen werden konnten */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Statistiken anzeigen */}
      <Row className="g-4 mt-3">
        {/* Eventanzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-calendar-event-fill"
                style={{ fontSize: '3rem', color: '#198754' }}
              ></i>
              <Card.Title className="mt-3">Meine Events</Card.Title>
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

        {/* Bewertung Anzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-star-fill"
                style={{ fontSize: '3rem', color: '#ffc107' }}
              ></i>
              <Card.Title className="mt-3">Meine Bewertungen</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="warning" className="bg-opacity-50">
                    {stats.ratingCount}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Kommentar Anzahl */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-chat-left-text-fill"
                style={{ fontSize: '3rem', color: '#0d6efd' }}
              ></i>
              <Card.Title className="mt-3">Meine Kommentare</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="primary" className="bg-opacity-50">
                    {stats.commentCount}
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
              <Card.Title className="mt-3">
                Meine gemeldeten Verstöße
              </Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="danger" className="bg-opacity-50">
                    {stats.totalViolations}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Pending Verstöße */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-hourglass-split"
                style={{ fontSize: '3rem', color: '#ffc107' }}
              ></i>
              <Card.Title className="mt-3">Verstöße in Bearbeitung</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="warning" className="bg-opacity-50">
                    {stats.pendingViolations}
                  </Badge>
                </h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Resolved Verstöße */}
        <Col md={4}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <i
                className="bi bi-check-circle-fill"
                style={{ fontSize: '3rem', color: '#28a745' }}
              ></i>
              <Card.Title className="mt-3">Verstöße erledigt</Card.Title>
              <Card.Text>
                <h3>
                  <Badge bg="success" className="bg-opacity-50">
                    {stats.resolvedViolations}
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
