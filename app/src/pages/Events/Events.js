// src/pages/Event.js
import React from 'react'
import CalendarPage from '../Calendar/Calendar'
import { Container } from 'react-bootstrap'

const Event = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="headline">Alle Events</h1>
      <CalendarPage />
    </Container>
  )
}

export default Event
