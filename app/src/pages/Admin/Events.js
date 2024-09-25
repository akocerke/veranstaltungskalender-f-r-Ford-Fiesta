// src/pages/Admin/Users.js
import React from 'react'
import { Container, Table, Button, Form } from 'react-bootstrap'

const Events = () => {
  return (
    <Container className="mt-5 mb-5">
      <h5 className='headline text-success mt-3 mb-3 text-lg-start'>Events verwalten</h5>

      {/* Suchfeld und Button */}
      <Form className="mb-3">
        <Form.Group controlId="searchId">
          <Form.Label>Event ID suchen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Event-ID ein"
          />
        </Form.Group>
        <Button variant="primary" className="mt-2">
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
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {/* Beispielhafte Eventdaten */}
          <tr>
            <td>34</td>
            <td>13</td>
            <td>Tuning-Tag für Fiesta MK5</td>
            <td>Veranstaltung zum Thema Tuning und Individualisierung des Ford Fiesta MK5. Präsentationen und Austausch von Ideen.</td>
            <td>25.11.2024</td>
            <td>tuning-tag.jpg</td>
            <td>
            <Button variant="primary" className='me-2 ms-2 mt-2 mb-2'>Bearbeiten</Button>
            <Button variant="danger" className='ms-2'>Löschen</Button>
            </td>
          </tr>
          {/* Weitere Beispiel-Daten können hier hinzugefügt werden */}
        </tbody>
      </Table>
    </Container>
  )
}

export default Events
