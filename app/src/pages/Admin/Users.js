import React, { useState, useEffect } from 'react'
import {
  Container,
  Table,
  Button,
  Form,
  Spinner,
  Toast,
  Modal,
} from 'react-bootstrap'
import {
  getAdminAllUsers,
  deleteAdminUser,
  putAdminUserRole,
} from '../../api/admins'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState('success') // success, danger
  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)

  // Funktion zum Abrufen aller Benutzer (Admins und Users)
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getAdminAllUsers() // Alle Benutzer abrufen
      setUsers(data)
      // Toast-Nachricht bei Erfolg ist nicht nötig, da die Liste geladen wird
    } catch (error) {
      setToastMessage(
        error.response
          ? error.response.data.message
          : 'Fehler beim Laden der Benutzer'
      )
      setToastVariant('danger')
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  // Benutzer abrufen, wenn die Komponente geladen wird
  useEffect(() => {
    fetchUsers()
  }, [])

  // Funktion zum Löschen eines Benutzers
  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        const response = await deleteAdminUser(userIdToDelete) // Benutzer löschen
        setToastMessage(response.message || 'Benutzer erfolgreich gelöscht') // Nachricht aus der Response
        setToastVariant('success')
        setShowToast(true)
        fetchUsers() // Benutzerliste nach dem Löschen aktualisieren
      } catch (error) {
        // Hier wird die Fehlermeldung vom Backend verwendet
        setToastMessage(
          error.response
            ? error.response.data.message
            : 'Fehler beim Löschen des Benutzers'
        )
        setToastVariant('danger')
        setShowToast(true)
      } finally {
        setShowModal(false) // Modal schließen
      }
    }
  }

  // Funktion zum Ändern der Rolle eines Benutzers
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await putAdminUserRole(userId, newRole) // Rolle des Benutzers ändern
      setToastMessage(
        response.message || `Rolle für Benutzer ${userId} erfolgreich geändert`
      ) // Nachricht aus der Response
      setToastVariant('success')
      setShowToast(true)
      fetchUsers() // Benutzerliste nach dem Rollenwechsel aktualisieren
    } catch (error) {
      // Hier wird die Fehlermeldung vom Backend verwendet
      setToastMessage(
        error.response
          ? error.response.data.message
          : 'Fehler beim Ändern der Rolle'
      )
      setToastVariant('danger')
      setShowToast(true)
    }
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Benutzer verwalten
      </h5>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
          <p>Lade Benutzer...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rolle</th>
              <th>Erstellt am</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() => {
                        setUserIdToDelete(user.id)
                        setShowModal(true)
                      }}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Keine Benutzer gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Toast für Benachrichtigungen */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className={`position-fixed bottom-50 start-50 translate-middle-x m-3 bg-${toastVariant}`}
      >
        <Toast.Header>
          <strong className="me-auto text-${toastVariant}">
            Benachrichtigung
          </strong>
          {/* Der Close-Button ist hier standardmäßig vorhanden */}
        </Toast.Header>
        <Toast.Body className={`text-white`}>{toastMessage}</Toast.Body>
      </Toast>

      {/* Modal für Bestätigung */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="bg-mordal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline2">
            Benutzer löschen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Möchten Sie den Benutzer mit der{' '}
          <span className="fw-bold">ID {userIdToDelete}</span> wirklich löschen?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Abbrechen
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Users
