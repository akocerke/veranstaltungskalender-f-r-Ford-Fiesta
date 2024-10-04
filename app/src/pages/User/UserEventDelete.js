import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Spinner, Toast, ToastContainer } from 'react-bootstrap'
import { deleteEvent } from '../../api/users'

const UserEventDelete = ({ show, handleClose, event, onDelete }) => {
  // Zustand für den Ladevorgang
  const [isDeleting, setIsDeleting] = useState(false)
  // Zustände für Toast-Nachricht und Sichtbarkeit
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastVariant, setToastVariant] = useState('success')

  const handleDelete = async () => {
    console.log('Löschen gestartet für Event ID:', event.id)

    // Zeige den Spinner während des Löschvorgangs an
    setIsDeleting(true)

    try {
      // Führe den API-Aufruf zum Löschen durch
      const result = await deleteEvent(event.id)
      console.log('Löschen erfolgreich:', result)

      // Erfolgsmeldung anzeigen
      setToastMessage('Das Event wurde erfolgreich gelöscht.')
      setToastVariant('success') // Setze Toast-Stil auf "Erfolg"
      setShowToast(true)

      // Rufe die onDelete-Funktion auf, um das Event aus der Liste zu entfernen
      onDelete(event.id)

      // Schließe das Modal
      handleClose()
    } catch (error) {
      console.error('Fehler beim Löschen:', error.message)

      // Fehlermeldung anzeigen
      setToastMessage('Fehler beim Löschen des Events: ' + error.message)
      setToastVariant('danger') // Setze Toast-Stil auf "Fehler"
      setShowToast(true)
    } finally {
      // Setze den Ladevorgang zurück
      setIsDeleting(false)
    }
  }

  return (
    <>
      {/* Modal für Event-Löschung */}
      <Modal show={show} onHide={handleClose} className="bg-mordal">
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline">
            Event löschen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bist du sicher, dass du das Event <strong> {event.title} </strong>{' '}
          löschen möchtest?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Abbrechen
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              'Löschen'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast für Benachrichtigungen */}
      <ToastContainer position="middle-center" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
          className="text-white"
        >
          <Toast.Header>
            <strong className="me-auto text-success">Benachrichtigung</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

UserEventDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UserEventDelete
