// pages/Violations/Violations.js
import React, { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { createViolation } from '../../api/users'
import { useParams } from 'react-router-dom'

const Violations = () => {
  const { eventId } = useParams() // Hol die Event-ID aus der URL
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() // Verhindert das Standardformularverhalten

    if (!reason) {
      setMessage('Bitte wählen Sie einen Grund aus.')
      setError(true)
      return
    }

    // Aufruf der createViolation-Funktion
    const response = await createViolation(eventId, reason, details)

    if (response) {
      // Erfolgreiche Meldung
      setMessage(response.message || 'Verstoß erfolgreich gemeldet!')
      setError(false)
    } else {
      // Fehler bei der Meldung
      setMessage('Fehler beim Melden des Verstoßes.') // Hier könnte man auch spezifische Fehler aus der Antwort einfügen
      setError(true)
    }

    // Eingabefelder zurücksetzen
    setReason('')
    setDetails('')
  }

  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline mb-5">Verstoß melden</h1>
      <Row className="justify-content-center">
        <Col xs={6} className="text-center">
          <p className="headline2">
            {' '}
            Event ID: <span className="text-secondary"> {eventId}</span>
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 mb-5">
        <Col md={6} className="border rounded p-4 shadow bg-light">
          {message && (
            <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Dropdown für den Grund */}
            <Form.Group controlId="formReason">
              <Form.Label className="text-color fw-bold">
                Grund für den Verstoß
              </Form.Label>
              <Form.Select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Wählen einen Grund</option>
                <option value="Spam">Spam</option>
                <option value="Missbrauch">Missbrauch</option>
                <option value="Falsche Informationen">
                  Falsche Informationen
                </option>
                <option value="Urheberrechtsverletzung">
                  Urheberrechtsverletzung
                </option>
                <option value="Unangebrachter Kommentar">
                  Unangebrachter Kommentar
                </option>
                <option value="Sonstiges">Sonstiges</option>
              </Form.Select>
            </Form.Group>

            {/* Optionales Textfeld für Details */}
            <Form.Group controlId="formDetails" className="mt-3">
              <Form.Label className="text-color fw-bold">Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Geben Sie zusätzliche Details an"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-danger" type="submit" className="mt-3">
              Verstoß melden
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Violations
