import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { deleteAdminEvent } from '../../api/admins';

const UserEventDelete = ({ show, handleClose, event, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');

  const handleDelete = async () => {
    if (!event || !event.id) {
      console.error("Event oder Event ID ist nicht verfügbar.");
      return;
    }

    console.log('Löschen gestartet für Event ID:', event.id);
    
    setIsDeleting(true);

    try {
      const result = await deleteAdminEvent(event.id); // Hier die richtige Funktion verwenden
      console.log('Löschen erfolgreich:', result);

      setToastMessage('Das Event wurde erfolgreich gelöscht.');
      setToastVariant('success');
      setShowToast(true);

      onDelete(event.id); // Aktualisiere die Event-Liste
      handleClose(); // Schließe das Modal
    } catch (error) {
      console.error('Fehler beim Löschen:', error.message);
      setToastMessage('Fehler beim Löschen des Events: ' + error.message);
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className='bg-mordal'>
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline">Event löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {event ? (
            <>Bist du sicher, dass du das Event <strong>{event.title}</strong> löschen möchtest?</>
          ) : (
            <>Löschen nicht möglich: Kein Event ausgewählt.</>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose} disabled={isDeleting}>
            Abbrechen
          </Button>
          <Button variant='outline-danger' onClick={handleDelete} disabled={isDeleting || !event}>
            {isDeleting ? <Spinner as="span" animation="border" size="sm" /> : 'Löschen'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="middle-center" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide 
          bg={toastVariant}
          className='text-white'
        >
          <Toast.Header>
            <strong className="me-auto text-success">Benachrichtigung</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

UserEventDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserEventDelete;
