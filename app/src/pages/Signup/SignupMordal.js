import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signup } from '../../api/auth'; // Importiere die Signup-Funktion

const SignupModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Für Fehleranzeige
  const [successMessage, setSuccessMessage] = useState(''); // Für Erfolgsmeldung

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Fehler zurücksetzen
    setSuccessMessage(''); // Erfolgsmeldung zurücksetzen

    // Validierung: Überprüfen, ob alle Felder ausgefüllt sind
    if (!username || !email || !password) {
      setError('Bitte fülle alle Felder aus.'); // Setze eine Fehlermeldung
      return; // Bricht die Funktion ab, wenn die Validierung fehlschlägt
    }

    try {
      const response = await signup(username, email, password);
      console.log('Signup erfolgreich:', response);
      setSuccessMessage('Registrierung erfolgreich! Bitte melde dich an.'); // Erfolgsmeldung setzen

      // Eingabefelder zurücksetzen
      setUsername('');
      setEmail('');
      setPassword('');

      // Optional: Hier kannst du den Benutzer zur Login-Seite umleiten oder eine andere Aktion ausführen
      // handleClose(); // Schließe das Modal nach erfolgreicher Registrierung
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      if (error.response && error.response.data.message) {
        // Zeige spezifische Fehlermeldung an, die von der API zurückgegeben wird
        setError(error.response.data.message);
      } else {
        // Allgemeine Fehlermeldung anzeigen, falls keine spezifische Fehlermeldung vorhanden ist
        setError('Fehler bei der Registrierung, bitte versuche es erneut.');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="bg-mordal">
      <Modal.Header closeButton>
        <Modal.Title className="text-color headline">Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={12}>
              <Form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>} {/* Fehleranzeige */}
                {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Erfolgsmeldung */}
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="text-color fw-bold">Benutzername</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Benutzernamen"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

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

                <Button className="primary w-100" type="submit">
                  Registrieren
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

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SignupModal;
