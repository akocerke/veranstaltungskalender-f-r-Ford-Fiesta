import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../../api/users';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch (error) {
        setError('Fehler beim Laden der Profil-Daten.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    // Setze die Erfolgsmeldung zurück, wenn die Seite geladen wird
    setSuccess(null);
  }, [location]); // Abhängigkeit von location hinzufügen

  const handleEditProfile = async () => {
    try {
      await updateUserProfile({ username: newUsername, email: newEmail });
      // Lade die Profil-Daten nach dem Update neu
      const updatedProfile = await getUserProfile();
      setProfileData(updatedProfile);
      setSuccess('Profil erfolgreich aktualisiert.');
      setError(null);

      // Setze die Erfolgsmeldung nach 5 Sekunden zurück
      setTimeout(() => setSuccess(null), 5000);

      setShowEditModal(false);
    } catch (error) {
      setError('Fehler beim Aktualisieren des Profils.');
      setSuccess(null);
    }
  };

  const handleChangePassword = async () => {
    try {
      // Implementiere die API-Aufruf zur Passwortänderung
      // await changeUserPassword({ currentPassword, newPassword });
      setSuccess('Passwort erfolgreich geändert.');
      setError(null);

      // Setze die Erfolgsmeldung nach 5 Sekunden zurück
      setTimeout(() => setSuccess(null), 5000);

      setShowPasswordModal(false);
    } catch (error) {
      setError('Fehler beim Ändern des Passworts.');
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h4 className="headline2 text-info">Mein Profil</h4>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
              <span className="ms-3">Lade Profil-Daten...</span>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : success ? (
            <Alert variant="success">{success}</Alert>
          ) : (
            profileData && (
              <Card className="p-4 shadow-sm">
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">
                      Benutzername:
                    </Col>
                    <Col xs={8}>
                      {profileData.username}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">
                      Email:
                    </Col>
                    <Col xs={8}>
                      {profileData.email}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">
                      Rolle:
                    </Col>
                    <Col xs={8}>{profileData.role}</Col>
                  </Row>
                  <Row>
                    <Col xs={4} className="fw-bold">
                      Registriert am:
                    </Col>
                    <Col xs={8}>
                      {new Date(profileData.createdAt).toLocaleDateString()}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => {
                          setNewUsername(profileData.username);
                          setNewEmail(profileData.email);
                          setShowEditModal(true);
                        }}
                      >
                        <i className="bi bi-pencil"></i> Benutzername & Email ändern
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        <i className="bi bi-lock"></i> Passwort ändern
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )
          )}
        </Col>
      </Row>

      {/* Modal für Profilbearbeitung */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        className="bg-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline">
            Profil bearbeiten
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="fw-bold text-color">
                Benutzername
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Neuen Benutzernamen eingeben"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-bold text-color">
                Email-Adresse
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Neue Email-Adresse eingeben"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
            <Button className="primary mt-3" onClick={handleEditProfile}>
              Speichern
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal für Passwortänderung */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        className="bg-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline">
            Passwort ändern
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label className="fw-bold text-color">
                Aktuelles Passwort
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Aktuelles Passwort eingeben"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label className="fw-bold text-color">
                Neues Passwort
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Neues Passwort eingeben"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button onClick={handleChangePassword} className="primary mt-3">
              Passwort ändern
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserProfile;
