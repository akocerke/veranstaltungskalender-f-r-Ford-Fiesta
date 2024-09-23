// src/pages/Event.js
import React from 'react';
import CalendarPage from '../Calendar/Calendar';
import CalendarUserAdminPage from '../Calendar/CalendarUserAdmin';
import { Container } from 'react-bootstrap';
import { isAuthenticated } from '../../api/users';

const Event = () => {
  const isUserAuthenticated = isAuthenticated(); // Prüfen, ob Benutzer angemeldet ist

  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline">Alle Events</h1>
      {isUserAuthenticated ? <CalendarUserAdminPage /> : <CalendarPage />}
    </Container>
  );
};

export default Event;
