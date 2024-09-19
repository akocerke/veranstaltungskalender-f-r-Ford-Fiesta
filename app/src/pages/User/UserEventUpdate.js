import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateEvent } from '../../api/users';
const UserEventUpdate = ({ show, handleClose, event, onUpdate }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(new Date(event.date).toISOString().split('T')[0]);
  const [image, setImage] = useState(event.image);

  const handleSubmit = async () => {
    try {
      const updatedEvent = await updateEvent({ id: event.id, title, description, date, image });
      onUpdate(updatedEvent);
      handleClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event bearbeiten</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Bild URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Abbrechen</Button>
        <Button variant="primary" onClick={handleSubmit}>Speichern</Button>
      </Modal.Footer>
    </Modal>
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
  onUpdate: PropTypes.func.isRequired
};

export default UserEventUpdate;
