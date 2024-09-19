import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { updateEvent } from '../../api/users';

const UserEventUpdate = ({ show, handleClose, event, onUpdate, refreshEvents }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(new Date(event.date).toISOString().split('T')[0]);
  const [image, setImage] = useState(event.image);

  // State für Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); // 'success' oder 'danger'

  const handleSubmit = async () => {
    try {
      const updatedEvent = await updateEvent({ id: event.id, title, description, date, image });
      onUpdate(updatedEvent);
      refreshEvents(); // Rufe die Funktion auf, um die Events zu aktualisieren
      handleClose();
      
      // Erfolgsmeldung anzeigen
      setToastMessage('Event erfolgreich aktualisiert!');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      // Fehlermeldung anzeigen
      setToastMessage('Fehler beim Aktualisieren des Events!');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className='bg-mordal'>
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline">Event bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label className="text-color fw-bold">Titel</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label className="text-color fw-bold">Beschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label className="text-color fw-bold">Datum</Form.Label>
              <Form.Control
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]} // Verhindert Auswahl von Daten in der Vergangenheit
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label className="text-color fw-bold">Bild</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>Abbrechen</Button>
          <Button variant='outline-primary' onClick={handleSubmit}>Speichern</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="middle-center" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
          className="text-white"
        >
          <Toast.Header>
            <strong className="me-auto text-success">{toastVariant === 'success' ? 'Erfolg' : 'Fehler'}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

UserEventUpdate.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  refreshEvents: PropTypes.func.isRequired // Füge refreshEvents als Prop hinzu
};

export default UserEventUpdate;
