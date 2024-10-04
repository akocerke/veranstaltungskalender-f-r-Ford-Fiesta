// src/pages/NotFound.js
import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-lg">
            <Card.Body>
              <Card.Title className="text-color headline2">
                404 - Seite nicht gefunden
              </Card.Title>
              <Card.Text className="text-secondary fw-bold">
                Die von Ihnen gesuchte Seite existiert nicht. Bitte überprüfen
                Sie die URL oder kehren Sie zur Startseite zurück.
              </Card.Text>
              <Button href="/" className="primary">
                Zurück zur Startseite
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
