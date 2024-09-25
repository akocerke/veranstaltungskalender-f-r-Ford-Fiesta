// src/pages/Admin/Events.js
import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Form, Alert } from 'react-bootstrap'
import { getAdminEvents } from '../../api/admins' // Stelle sicher, dass die Funktion korrekt importiert ist

const Events = () => {
  const [events, setEvents] = useState([]) // State für die Event-Daten
  const [error, setError] = useState(null) // State für Fehlermeldungen
  const [searchId, setSearchId] = useState('') // State für die Suche

  // Funktion, um die Events abzurufen
  const fetchEvents = async () => {
    try {
      const data = await getAdminEvents() // Rufe die Events von der API ab
      setEvents(data) // Setze die Event-Daten in den State
    } catch (error) {
      setError(error.message) // Fehler behandeln
    }
  }

  useEffect(() => {
    fetchEvents() // Events abrufen, wenn die Komponente geladen wird
  }, [])

  // Such-Handler
  const handleSearch = () => {
    // Filtere die Events nach der eingegebenen ID (wenn vorhanden)
    if (searchId) {
      const filteredEvents = events.filter(
        (event) => event.id.toString() === searchId
      )
      setEvents(filteredEvents)
    } else {
      // Wenn keine Such-ID eingegeben ist, alle Events abrufen
      fetchEvents()
    }
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Events verwalten
      </h5>

      {/* Fehleranzeige */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Suchfeld und Button */}
      <Form className="mb-3">
        <Form.Group controlId="searchId">
          <Form.Label>Event ID suchen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Event-ID ein"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Suchfeld mit dem State verknüpfen
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={handleSearch}>
          Suchen
        </Button>
      </Form>

      {/* Tabelle */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER ID</th>
            <th>Titel</th>
            <th>Beschreibung</th>
            <th>Datum</th>
            <th>Bild</th>
            <th>Erstellt am</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.userId}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.image}</td>
                <td>
                  {new Date(event.created_at).toLocaleString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // 12-Stunden-Format (AM/PM) deaktivieren, falls gewünscht
                  })}
                </td>

                <td>
                  <Button variant="danger" className="ms-2">
                    Löschen
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Keine Events gefunden.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default Events
