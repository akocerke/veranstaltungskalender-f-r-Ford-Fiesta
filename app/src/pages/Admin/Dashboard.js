// src/pages/Admin/Dashboard.js
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Dashboard = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="headline">Dashboard Übersicht</Card.Title>
              <Card.Text>
                Hier finden Sie eine Übersicht der wichtigsten Statistiken.
              </Card.Text>
              {/* Füge hier weitere Statistiken und Informationen hinzu */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
