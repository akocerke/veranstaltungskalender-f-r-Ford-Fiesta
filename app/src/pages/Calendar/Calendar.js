// src/pages/Calendar/Calendar.js
import React, { useState, useEffect } from 'react'
import { Container, Modal, Button, Form } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/de' // Importiere die deutsche Locale
import StarRatings from 'react-star-ratings'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const localizer = momentLocalizer(moment)

// Setze die deutsche Locale für Moment.js
moment.locale('de')

const CalendarPage = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    // Hier API-Anfrage für Events einfügen
    const fetchedEvents = [
      {
        id: 1,
        title: 'Event 1',
        start: new Date('2024-08-031T10:00:00'),
        end: new Date('2024-08-07T12:00:00'),
        location: 'Ort 1',
        description: 'Beschreibung 1',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 1, // ID des Event-Eigentümers
        rating: 4, // Beispielbewertung
      },
      {
        id: 2,
        title: 'Event 2',
        start: new Date('2024-08-09T09:00:00'),
        end: new Date('2024-08-09T11:00:00'),
        location: 'Ort 2',
        description: 'Beschreibung 2',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 2,
        rating: 3
    },
    {
        id: 3,
        title: 'Event 3',
        start: new Date('2024-08-15T14:00:00'),
        end: new Date('2024-08-15T16:00:00'),
        location: 'Ort 3',
        description: 'Beschreibung 3',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 3,
        rating: 4
    },
    {
        id: 4,
        title: 'Event 4',
        start: new Date('2024-09-01T10:00:00'),
        end: new Date('2024-09-01T12:00:00'),
        location: 'Ort 4',
        description: 'Beschreibung 4',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 4,
        rating: 5
    },
    {
        id: 5,
        title: 'Event 5',
        start: new Date('2024-09-15T09:00:00'),
        end: new Date('2024-09-15T11:00:00'),
        location: 'Ort 5',
        description: 'Beschreibung 5',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 5,
        rating: 2
    },
    {
        id: 6,
        title: 'Event 6',
        start: new Date('2024-10-01T11:00:00'),
        end: new Date('2024-10-01T13:00:00'),
        location: 'Ort 6',
        description: 'Beschreibung 6',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 6,
        rating: 3
    },
    {
        id: 7,
        title: 'Event 7',
        start: new Date('2024-10-15T14:00:00'),
        end: new Date('2024-10-15T16:00:00'),
        location: 'Ort 7',
        description: 'Beschreibung 7',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 7,
        rating: 4
    },
    {
        id: 8,
        title: 'Event 8',
        start: new Date('2024-11-01T10:00:00'),
        end: new Date('2024-11-01T12:00:00'),
        location: 'Ort 8',
        description: 'Beschreibung 8',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 8,
        rating: 5
    },
    {
        id: 9,
        title: 'Event 9',
        start: new Date('2024-11-15T09:00:00'),
        end: new Date('2024-11-15T11:00:00'),
        location: 'Ort 9',
        description: 'Beschreibung 9',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 9,
        rating: 2
    },
    {
        id: 10,
        title: 'Event 10',
        start: new Date('2024-12-01T11:00:00'),
        end: new Date('2024-12-01T13:00:00'),
        location: 'Ort 10',
        description: 'Beschreibung 10',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 10,
        rating: 3
    },
    {
        id: 11,
        title: 'Event 11',
        start: new Date('2024-12-15T14:00:00'),
        end: new Date('2024-12-15T16:00:00'),
        location: 'Ort 11',
        description: 'Beschreibung 11',
        imageUrl: 'https://via.placeholder.com/150',
        ownerId: 11,
        rating: 4
    },
    
      // Weitere Events...
    ]
    setEvents(fetchedEvents)
  }, [])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsEditing(false)
    setRating(event.rating || 0) // Setze die Bewertung des ausgewählten Events
  }

  const handleClose = () => {
    setSelectedEvent(null)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedEvent(selectedEvent)
  }

  const handleSave = () => {
    // Hier die Logik für das Speichern der Änderungen hinzufügen
    console.log('Event updated:', editedEvent)
    handleClose()
  }

  const handleDelete = () => {
    // Hier die Logik für das Löschen des Events hinzufügen
    console.log('Event deleted:', selectedEvent.id)
    handleClose()
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleSubmitRating = () => {
    // Hier die Logik für das Speichern der Bewertung hinzufügen
    console.log('Rating submitted:', rating)
    // Eventuell API-Aufruf hier hinzufügen
  }

  const handleDateChange = (date, field) => {
    setEditedEvent({ ...editedEvent, [field]: date })
  }

  return (
    <Container className="mt-5 mb-5">
      <p className="headline">Kalender</p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        culture="de"
      />

      {/* Detailansicht als Modal */}
      {selectedEvent && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Datum:</strong> {moment(selectedEvent.start).format('LL')}
            </p>
            <p>
              <strong>Ort:</strong> {selectedEvent.location}
            </p>
            <p>
              <strong>Beschreibung:</strong> {selectedEvent.description}
            </p>

            {/* Bewertung */}
            <div className="mb-3">
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <Button
                variant="info"
                onClick={handleSubmitRating}
                className="mt-2 ms-3"
              >
                Bewerten
              </Button>
            </div>

            {/* Bearbeitungsformular */}
            {isEditing ? (
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label className="fw-bold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedEvent.title}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, title: e.target.value })
                    }
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group controlId="formStart">
                  <Form.Label className="me-3 mb-3 fw-bold">
                    Startdatum
                  </Form.Label>
                  <DatePicker
                    selected={editedEvent.start}
                    onChange={(date) => handleDateChange(date, 'start')}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="formEnd">
                  <Form.Label className="me-3 mb-3 fw-bold">
                    Enddatum
                  </Form.Label>
                  <DatePicker
                    selected={editedEvent.end}
                    onChange={(date) => handleDateChange(date, 'end')}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                  <Form.Label className="fw-bold">Bild-URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedEvent.imageUrl}
                    onChange={(e) =>
                      setEditedEvent({
                        ...editedEvent,
                        imageUrl: e.target.value,
                      })
                    }
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label className="fw-bold">Beschreibung</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedEvent.description}
                    onChange={(e) =>
                      setEditedEvent({
                        ...editedEvent,
                        description: e.target.value,
                      })
                    }
                    className="mb-3"
                  />
                </Form.Group>
                {/* Weitere Formularfelder für Event-Daten */}
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="mt-2 mb-3"
                >
                  Speichern
                </Button>
              </Form>
            ) : (
              <Button variant="primary" onClick={handleEdit} className="me-3">
                Bearbeiten
              </Button>
            )}

            <Button variant="danger" onClick={handleDelete} className="me-3">
              Löschen
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
}

export default CalendarPage
