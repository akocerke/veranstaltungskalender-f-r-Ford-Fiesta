// src/pages/Admin/Violations.js
import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap'
import { getViolations, updateViolationsStatus } from '../../api/admins'

const Violations = () => {
  const [violations, setViolations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const data = await getViolations()
        setViolations(data) // Setzen der abgerufenen Daten in den Zustand
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchViolations()
  }, [])

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending' // Status umschalten

    try {
      const response = await updateViolationsStatus(id, newStatus) // API-Antwort erhalten
      setViolations((prev) =>
        prev.map((violation) =>
          violation.id === id ? { ...violation, status: newStatus } : violation
        )
      )
      setSuccessMessage(
        response.message ||
          `Status erfolgreich auf "${newStatus}" aktualisiert!`
      )
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <Container className="mt-5 mb-5 d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Lädt...</span>
        </Spinner>
      </Container>
    ) // Spinner-Anzeige
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Verstöße verwalten
      </h5>

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage('')}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      <Table striped bordered hover size="sm" variant="light" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event ID</th>
            <th>Benutzer ID</th>
            <th>Grund</th>
            <th>Details</th>
            <th>Status</th>
            <th>Erstellt am</th>
            <th>Bearbeiten</th>
          </tr>
        </thead>
        <tbody>
          {violations.map((violation) => (
            <tr key={violation.id}>
              <td>{violation.id}</td>
              <td>{violation.eventId}</td>
              <td>{violation.reportedBy}</td>
              <td>{violation.reason}</td>
              <td>{violation.details}</td>
              <td>{violation.status}</td>
              <td>{new Date(violation.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant={
                    violation.status === 'pending' ? 'warning' : 'success'
                  } // Rot für "pending", Grün für "resolved"
                  className="me-2 ms-2 mt-2 mb-2"
                  onClick={() =>
                    handleUpdateStatus(violation.id, violation.status)
                  }
                >
                  {violation.status === 'pending' ? (
                    <>
                      <i className="bi bi-x-circle"></i>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i>
                    </>
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Violations
