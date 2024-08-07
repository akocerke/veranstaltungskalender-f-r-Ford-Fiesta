// src/pages/Admin/Users.js
import React from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';

const Users = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className='headline'>Benutzerverwaltung</h1>
      
      {/* Suchfeld und Button */}
      <Form className="mb-3">
        <Form.Group controlId="searchId">
          <Form.Label>Benutzer ID suchen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Benutzer-ID ein"
          />
        </Form.Group>
        <Button variant="primary" className="mt-2">Suchen</Button>
      </Form>
      
      {/* Tabelle */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rolle</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {/* Beispielhafte Benutzerdaten */}
          <tr>
            <td>1</td>
            <td>Max Mustermann</td>
            <td>max.mustermann@example.com</td>
            <td>Admin</td>
            <td>
              <Button variant="primary" className='me-3'>Bearbeiten</Button>
              <Button variant="danger" className='me-3'>Löschen</Button>
            </td>
          </tr>
          {/* Weitere Beispiel-Daten können hier hinzugefügt werden */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
