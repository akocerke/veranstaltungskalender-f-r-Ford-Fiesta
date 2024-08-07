// src/pages/Admin/Violations.js
import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Violations = () => {
  return (
    <Container className="mt-5">
      <h1>Verstoßverwaltung</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event ID</th>
            <th>Grund</th>
            <th>Details</th>
            <th>Status</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {/* Hier fügst du die Verstoßdaten ein */}
          <tr>
            <td>1</td>
            <td>101</td>
            <td>Unangemessene Inhalte</td>
            <td>Der Beitrag enthält unangemessene Sprache.</td>
            <td>Offen</td>
            <td>
              <Button variant="primary">Bearbeiten</Button>
              <Button variant="danger">Löschen</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Violations;
