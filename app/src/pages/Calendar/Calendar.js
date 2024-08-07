// src/pages/Calendar/Calendar.js
import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setze die Locale auf Englisch oder eine andere Sprache
const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Event 1',
    start: new Date('2024-08-07T10:00:00'),
    end: new Date('2024-08-07T12:00:00'),
    location: 'Ort 1',
    description: 'Beschreibung 1',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Event 2',
    start: new Date('2024-08-10T14:00:00'),
    end: new Date('2024-08-10T16:00:00'),
    location: 'Ort 2',
    description: 'Beschreibung 2',
    imageUrl: 'https://via.placeholder.com/150'
  },
  // Weitere Events hier hinzufügen
];

const CalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className='headline'>Kalender</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
      />

      {/* Detailansicht als Modal */}
      {selectedEvent && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="img-fluid mb-3" />
            <p><strong>Datum:</strong> {moment(selectedEvent.start).format('LL')}</p>
            <p><strong>Ort:</strong> {selectedEvent.location}</p>
            <p><strong>Beschreibung:</strong> {selectedEvent.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default CalendarPage;
