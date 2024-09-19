import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert, Row, Col, Button } from 'react-bootstrap';
import { getEventsByUser } from '../../api/users';
import UserEventUpdate from './UserEventUpdate';
import UserEventDelete from './UserEventDelete';
import styles from './UserEvents.module.css';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEventsByUser();
      setEvents(data);
    } catch (error) {
      setError('Fehler beim Abrufen der Events.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleUpdateClose = () => setShowUpdateModal(false);
  const handleDeleteClose = () => setShowDeleteModal(false);

  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const handleEventDelete = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" />
        <p>Lade Events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.alert}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className={`mt-3 ${styles.eventsContainer}`}>
      <h4 className={`headline2 text-info mt-3 ms-4`}>Meine Events</h4>
      {events.length === 0 ? (
        <Alert variant="info" className="mt-5">Keine Events gefunden.</Alert>
      ) : (
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <Card key={event.id} className={`mb-4 shadow ${styles.eventCard}`} style={{ width: '18rem' }}>
              {event.image && (
                <Card.Img variant="top" src={event.image} alt={`Bild: ${event.title}`} className={styles.eventImage} />
              )}
              <Card.Body>
                <Card.Title className={`headline2 text-secondary ${styles.eventTitle}`}>{event.title}</Card.Title>
                <hr></hr>
                <Card.Text className={styles.eventDescription}>{event.description}</Card.Text>
                <Card.Text className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Card.Text>
              </Card.Body>
              <Row className='mb-3 mt-3 ms-1'>
                <Col>
                  <Button
                    variant='outline-primary'
                    className='me-3'
                    onClick={() => handleUpdateClick(event)}
                  >
                    Bearbeiten
                  </Button>
                  <Button
                    variant='outline-danger'
                    onClick={() => handleDeleteClick(event)}
                  >
                    Löschen
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

      {selectedEvent && (
        <>
          <UserEventUpdate
            show={showUpdateModal}
            handleClose={handleUpdateClose}
            event={selectedEvent}
            onUpdate={handleEventUpdate}
            refreshEvents={fetchEvents} // Prop für das erneute Abrufen der Events
          />
          <UserEventDelete
            show={showDeleteModal}
            handleClose={handleDeleteClose}
            event={selectedEvent}
            onDelete={handleEventDelete}
          />
        </>
      )}
    </div>
  );
};

export default UserEvents;
