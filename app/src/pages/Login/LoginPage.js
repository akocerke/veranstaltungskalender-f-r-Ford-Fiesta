import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { login } from '../../api/auth'; // Import your login API

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login erfolgreich:', response);

      // Die Rolle und den Token aus der Antwort abrufen
      const { token, user } = response;
      const { role } = user;

      console.log('Erhaltener Token:', token);
      console.log('User Role:', role);

      // Weiterleitung basierend auf der Benutzerrolle
      if (role === 'admin') {
        navigate('/admin/dashboard'); // Weiterleitung zum Admin-Dashboard
      } else if (role === 'user') {
        navigate('/users/dashboard'); // Weiterleitung zum User-Dashboard
      }

      // Eingabefelder zurücksetzen
      setEmail('');
      setPassword('');

      handleClose(); // Schließe das Modal bei erfolgreichem Login
    } catch (error) {
      console.error('Fehler beim Login:', error);
      setErrorMessage('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="bg-mordal">
      <Modal.Header closeButton>
        <Modal.Title className="text-color headline">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-color fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-color fw-bold">Passwort</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}

                <Button className="primary w-100" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LoginModal;
