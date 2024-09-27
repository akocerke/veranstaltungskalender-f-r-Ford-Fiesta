// src/pages/Admin/Events.js
import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap'
import { getAdminEvents } from '../../api/admins' // Importiere die Funktion
import { useLocation } from 'react-router-dom' // Importiere useLocation
import UserEventDelete from './UserEventDelete' // Importiere das Löschmodul

const Events = () => {
  const [events, setEvents] = useState([]) // State für die Event-Daten
  const [filteredEvents, setFilteredEvents] = useState([]) // State für gefilterte Event-Daten
  const [error, setError] = useState(null) // State für Fehlermeldungen
  const [searchId, setSearchId] = useState('') // State für die Suche
  const [loading, setLoading] = useState(true) // State für das Laden
  const [selectedEvent, setSelectedEvent] = useState(null) // State für das ausgewählte Event
  const [showDeleteModal, setShowDeleteModal] = useState(false) // Modal anzeigen
  const location = useLocation() // Holen der aktuellen Location

  // Funktion, um die Events abzurufen
  const fetchEvents = async () => {
    try {
      const data = await getAdminEvents() // Rufe die Events von der API ab
      setEvents(data) // Setze die Event-Daten in den State
      setFilteredEvents(data) // Setze die gefilterten Events gleich den originalen Events
      setLoading(false) // Setze das Laden auf false
    } catch (error) {
      setError(error.message) // Fehler behandeln
      setLoading(false) // Setze das Laden auf false, auch bei Fehler
    }
  }

  useEffect(() => {
    fetchEvents() // Events abrufen, wenn die Komponente geladen wird oder sich die Route ändert
  }, [location]) // Abhängigkeit von der aktuellen Location

  // Such-Handler
  const handleSearch = () => {
    if (searchId) {
      // Filtere die Events nach der eingegebenen ID
      const filtered = events.filter(
        (event) => event.id.toString() === searchId
      )
      setFilteredEvents(filtered) // Setze die gefilterten Events
    } else {
      // Wenn keine Such-ID eingegeben ist, alle Events zurücksetzen
      setFilteredEvents(events) // Setze alle Events zurück
    }
  }

  // Event delete
  const handleDeleteClick = (event) => {
    setSelectedEvent(event) // Setze das ausgewählte Event
    setShowDeleteModal(true) // Zeige das Modal
  }

  const handleDeleteClose = () => setShowDeleteModal(false) // Schließe das Modal
  const handleEventDelete = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    )
    setFilteredEvents((prevFilteredEvents) =>
      prevFilteredEvents.filter((event) => event.id !== eventId)
    )
  }

  // Spinner während des Ladens
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spinner animation="border" />
        <p>Lade Events...</p>
      </div>
    )
  }

  // Fehleranzeige
  if (error) {
    return (
      <div className="alert">
        <Alert variant="danger">{error}</Alert>
      </div>
    )
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Events verwalten
      </h5>

      {/* Suchfeld und Button */}
      <Form className="mb-3">
        <Form.Group controlId="searchId">
          <Form.Label className='text-color fw-bold'>Event ID suchen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Event-ID ein"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Suchfeld mit dem State verknüpfen
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={handleSearch}
        >
          <i className="bi bi-search"></i> Suchen
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
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
                    hour12: false,
                  })}
                </td>
                <td>
                  <Button
                    className="ms-2"
                    variant="outline-danger"
                    onClick={() => handleDeleteClick(event)}
                  >
                    <i className="bi bi-trash3"></i>
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
      <UserEventDelete
        show={showDeleteModal}
        handleClose={handleDeleteClose}
        event={selectedEvent}
        onDelete={handleEventDelete}
      />
    </Container>
  )
}

export default Events
