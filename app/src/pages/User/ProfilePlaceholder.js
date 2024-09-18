// src/pages/User/ProfilePlaceholder.js
import React from 'react';
import { Card } from 'react-bootstrap';

const ProfilePlaceholder = () => {
  return (
    <Card className='mt-3'>
      <Card.Body>
        <Card.Title>Mein Profil</Card.Title>
        <Card.Text>
          Diese Seite wird bald verfügbar sein. Hier stehen Ihre Profilinformationen.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfilePlaceholder;
