import React, { useState, useEffect } from 'react';
import {
  Container,
  Modal,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/de';
import { getAllEvents } from '../../api/events';
import { changeRate, changeComment } from '../../api/users';

moment.tz.setDefault('Europe/Berlin');

const localizer = momentLocalizer(moment);
moment.locale('de');

const CalendarUserAdmin = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const fetchedEvents = await getAllEvents();
      const formattedEvents = fetchedEvents.map((event) => {
        const originalDate = moment.tz(event.date, 'Europe/Berlin').toDate();
        const isAllDay = event.date.split(' ').length === 1;

        let startDate;
        let endDate;

        if (isAllDay) {
          startDate = moment.tz(originalDate, 'Europe/Berlin').startOf('day').toDate();
          endDate = moment.tz(originalDate, 'Europe/Berlin').endOf('day').toDate();
        } else {
          startDate = originalDate;
          endDate = new Date(originalDate.getTime() + 60 * 60 * 1000);
        }

        return {
          id: event.id,
          title: event.title,
          start: startDate,
          end: endDate,
          allDay: isAllDay,
          description: event.description,
          imageUrl: event.image,
          comments: event.comments.map((c) => ({
            comment: c.comment,
            username: c.username || 'Unbekannt',
          })),
          ratings: event.ratings,
        };
      });

      setEvents(formattedEvents);
      setFilteredEvents(formattedEvents);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setRating(0);
    setComment('');
    setMessage('');
    
    const userId = 13; // Hier sollte die User-ID dynamisch gesetzt werden
    const alreadyRated = event.ratings.some(r => r.userId === userId);
    const alreadyCommented = event.comments.some(c => c.username === `User${userId}`);
    
    setHasRated(alreadyRated);
    setHasCommented(alreadyCommented);
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setMessage('');
    setHasRated(false);
    setHasCommented(false);
  };

  const renderStars = (currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        onClick={() => !hasRated && setRating(index + 1)}
        style={{ cursor: 'pointer', color: index < currentRating ? 'gold' : 'gray' }}
      >
        {index < currentRating ? '★' : '☆'}
      </span>
    ));
  };

  const handleRatingSubmit = async () => {
    if (rating > 0 && !hasRated) {
      try {
        const response = await changeRate(selectedEvent.id, rating);
        setHasRated(true);
        setMessage(response.message); // Rückmeldung anzeigen
        setRating(0);
        await fetchData(); // Daten neu laden
      } catch (error) {
        setMessage('Fehler beim Einreichen der Bewertung: ' + error.message);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      if (hasCommented) {
        setMessage('Du hast bereits einen Kommentar zu diesem Event abgegeben.');
        return;
      }
  
      try {
        const response = await changeComment(selectedEvent.id, comment);
        setHasCommented(true);
        setMessage(response.message); // Rückmeldung vom Backend anzeigen
        setComment(''); // Kommentar zurücksetzen
        await fetchData(); // Daten neu laden
      } catch (error) {
        setMessage((error.response?.data.message || error.message));
      }
    } else {
      setMessage('Bitte gib einen Kommentar ein.');
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <p className="headline">Kalender</p>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Nach Events suchen"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        culture="de"
        components={{
          event: ({ event }) => <span>{event.title}</span>,
        }}
      />

      {selectedEvent && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-color">{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              className="img-fluid mb-2"
            />
            <p>
              <strong className="text-color">Datum:</strong>
              <br />
              <span className="span">{moment(selectedEvent.start).format('LL')}</span>
            </p>
            <p>
              <strong className="text-color">Beschreibung:</strong>
              <br />
              <span className="span">{selectedEvent.description}</span>
            </p>
            <p className="mb-1">
              <strong className="text-color">Kommentare:</strong>
            </p>
            <div>
              {selectedEvent.comments.length > 0 ? (
                selectedEvent.comments.map((c) => (
                  <p key={c.username} className="mb-1">
                    <span className="fw-bold">@{c.username}:</span> {c.comment}
                  </p>
                ))
              ) : (
                <p>Keine Kommentare vorhanden.</p>
              )}
            </div>
            <p className='mt-3'>
              <strong className="text-color">Bewertungen:</strong>
            </p>
            <div className='mt-0'>
              {selectedEvent.ratings.length > 0 ? (
                selectedEvent.ratings.map((r, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <span>{renderStars(r.rating)}</span>
                    <span className="ms-2">{r.rating}</span>
                  </div>
                ))
              ) : (
                <span>Keine Bewertungen vorhanden</span>
              )}
            </div>

            {/* Bewertung hinzufügen */}
            {!hasRated && (
              <div className="mt-3">
                <strong className="text-color">Deine Bewertung:</strong>
                <div>{renderStars(rating)}</div>
                <Button onClick={handleRatingSubmit} className="mt-2 primary">Bewertung abgeben</Button>
              </div>
            )}
            {/* Kommentar hinzufügen */}
            {!hasCommented && (
              <div className="mt-3">
                <strong className="text-color">Dein Kommentar:</strong>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-2"
                />
                <Button onClick={handleCommentSubmit} className="mt-2 primary">Kommentar abgeben</Button>
              </div>
            )}
            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default CalendarUserAdmin;
