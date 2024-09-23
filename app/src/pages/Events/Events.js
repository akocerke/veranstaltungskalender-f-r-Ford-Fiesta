// src/pages/Event.js
import React from 'react'
import CalendarPage from '../Calendar/Calendar'
import CalendarUserAdminPage from '../Calendar/CalendarUserAdmin'
import { Container } from 'react-bootstrap'

const Event = () => {
  // Benutzerrolle aus dem localStorage abrufen
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    // Angenommen, das Token enthält die Rolle als Payload
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    userRole = decodedToken.role; // Beispiel: Rolle aus dem Token holen
  }

  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline">Alle Events</h1>
      {userRole ? <CalendarUserAdminPage /> : <CalendarPage />}
    </Container>
  );
};

export default Event;