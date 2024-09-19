import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getUserProfile } from '../../api/users';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

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
          ) : (
            profileData && (
              <Card className="p-4 shadow-sm">
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">Benutzername:</Col>
                    <Col xs={8}>{profileData.username}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">Email:</Col>
                    <Col xs={8}>{profileData.email}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold">Rolle:</Col>
                    <Col xs={8}>{profileData.role}</Col>
                  </Row>
                  <Row>
                    <Col xs={4} className="fw-bold">Registriert am:</Col>
                    <Col xs={8}>{new Date(profileData.createdAt).toLocaleDateString()}</Col>
                  </Row>
                </Card.Body>
              </Card>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
