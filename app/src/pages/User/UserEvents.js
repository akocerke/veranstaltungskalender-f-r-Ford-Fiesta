import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { getEventsByUser } from '../../api/users';
import styles from './UserEvents.module.css'; // Importiere die CSS-Module

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchEvents();
  }, []);

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
      <h3 className={`headline2 text-info text-shadow mt-3 ms-2`}>Meine Events</h3>
      {events.length === 0 ? (
        <Alert variant="info">Keine Events gefunden.</Alert>
      ) : (
        events.map(event => (
          <Card key={event.id} className={`mb-4 shadow ${styles.eventCard}`} style={{ width: '18rem' }}>
            {event.image && (
              <Card.Img variant="top" src={event.image} alt={event.title} className={styles.eventImage} />
            )}
            <Card.Body>
              <Card.Title className={styles.eventTitle}>{event.title}</Card.Title>
              <Card.Text className={styles.eventDescription}>{event.description}</Card.Text>
              <Card.Text className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserEvents;
