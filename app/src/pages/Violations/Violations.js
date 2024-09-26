// pages/Violations/Violations.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { createViolation } from '../../api/users'; // Direkter Import

const Violations = () => {
  const [eventId, setEventId] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert das Standardformularverhalten

    // Aufruf der createViolation-Funktion
    const response = await createViolation(eventId, reason, details);

    if (response) {
      // Erfolgreiche Meldung
      setMessage(response.message || 'Verstoß erfolgreich gemeldet!');
      setError(false);
    } else {
      // Fehler bei der Meldung
      setMessage('Fehler beim Melden des Verstoßes.'); // Hier könnte man auch spezifische Fehler aus der Antwort einfügen
      setError(true);
    }

    // Eingabefelder zurücksetzen
    setEventId('');
    setReason('');
    setDetails('');
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline">Verstöße für Event ID: {eventId}</h1>

      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className='border rounded p-4 shadow bg-light'>
          {message && (
            <Alert variant={error ? 'danger' : 'success'}>
              {message}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEventId">
              <Form.Label>Event ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Geben Sie die Event-ID ein" 
                value={eventId} 
                onChange={(e) => setEventId(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formReason">
              <Form.Label>Grund</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Geben Sie den Grund für den Verstoß ein" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formDetails">
              <Form.Label>Details (optional)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Geben Sie zusätzliche Details an" 
                value={details} 
                onChange={(e) => setDetails(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Verstoß melden
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Violations;
