// pages/Events/CreateEvent.js
import React, { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { createEvent } from '../../api/users' // Direkter Import

const CreateEvent = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('info') // Standard ist "info"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAlertMessage('')

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (!title || !description || !date || !imageFile) {
      setAlertMessage('Bitte fülle alle Felder aus.')
      setAlertVariant('danger') // Setze den Alert auf "danger"
      return
    }

    // Erstelle das Event und lade das Bild hoch
    const result = await createEvent({ title, description, date }, imageFile)

    // Verarbeite die Antwort von createEvent
    if (result) {
      setAlertMessage(result.message) // Zeigt die Nachricht aus der API zurück
      setAlertVariant(result.success ? 'success' : 'danger') // Setze den Alert auf "success" oder "danger"

      // Leere die Eingabefelder nach erfolgreichem Upload
      if (result.success) {
        setTitle('')
        setDescription('')
        setDate('')
        setImageFile(null)
      }
    } else {
      setAlertMessage('Fehler beim Erstellen des Events.')
      setAlertVariant('danger') // Setze den Alert auf "danger"
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

  // Funktion zum Erhalten des heutigen Datums im richtigen Format
  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0') // Monate sind 0-basiert
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}` // ISO-Format für das Datum
  }
  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline">Event erstellen</h1>

      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className=" border rounded p-4 shadow bg-light">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="eventTitle">
              <Form.Label className="text-color fw-bold mb-2 mt-2">
                Titel
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Gib den Titel des Events ein"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventDescription">
              <Form.Label className="text-color fw-bold mb-2 mt-3">
                Beschreibung
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Gib eine Beschreibung des Events ein"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label className="text-color fw-bold mb-2 mt-3">
                Datum
              </Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={getTodayDate()} // Setze das Minimum auf das heutige Datum
              />
            </Form.Group>

            <Form.Group controlId="eventImage">
              <Form.Label className="text-color fw-bold mb-2 mt-3">
                Bild hochladen
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            {alertMessage && (
              <Alert variant={alertVariant} className="mt-4">
                {alertMessage}
              </Alert>
            )}
            <Button className="primary mt-4" type="submit">
              Event erstellen
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateEvent
